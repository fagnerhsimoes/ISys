using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ISys.Domain.Core.Bus;
using ISys.Domain.Core.Notifications;
using ISys.Infra.CrossCutting.Identity.Models;
using ISys.Infra.CrossCutting.Identity.Models.AccountViewModels;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ISys.Services.Api.Controllers
{
    [Authorize]
    [Route("api")]

    public class AccountController : ApiController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;
        private readonly AppSettings _appSettings;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            INotificationHandler<DomainNotification> notifications,
            ILoggerFactory loggerFactory,
            IOptions<AppSettings> appSettings,
            IMediatorHandler mediator) : base(notifications, mediator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }

        [AllowAnonymous]
        [HttpPost("v1/auth/login")]
         public async Task<object> Login([FromBody] LoginViewModel loginUser)
         {
             if (!ModelState.IsValid)
             {
                 NotifyModelStateErrors();
                 return Response(loginUser);
             }

             var user = await _userManager.FindByEmailAsync(loginUser.Email);
             if (user == null)
             {
                 return BadRequest("Usuário não encontrado");
             }

             var result = await _signInManager.PasswordSignInAsync(loginUser.Email, loginUser.Password, false, true);

             if (result.Succeeded)
             {
                 _logger.LogInformation(1, "Login Efetuado com sucesso.");
                 return await GerarJwt(loginUser.Email);
             }

             return BadRequest("Senha incorreta");
         }

        [AllowAnonymous]
        [HttpPost("v1/auth/register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registerUser)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(registerUser);
            }

            var HasUser = await _userManager.FindByEmailAsync(registerUser.Email);
            if (HasUser != null)
            {
                return BadRequest("E-mail já cadastrado");
            }

            var user = new ApplicationUser { UserName = registerUser.Email, Email = registerUser.Email };

            var result = await _userManager.CreateAsync(user, registerUser.Password);

            if (result.Succeeded)
            {
                // User claim for write Entities data
                await _userManager.AddClaimAsync(user, new Claim("Room"        , "Write"));
                await _userManager.AddClaimAsync(user, new Claim("Reservation" , "Write"));

                // User claim for Remove Entities data
                await _userManager.AddClaimAsync(user, new Claim("Room"        , "Remove"));
                await _userManager.AddClaimAsync(user, new Claim("Reservation" , "Remove"));


                await _signInManager.SignInAsync(user, false);
                _logger.LogInformation(3, "Usuário cadastrado com sucesso!.");
                registerUser.Password        = "";
                registerUser.ConfirmPassword = "";
                return Response(registerUser);
            }

            AddIdentityErrors(result);
            return Response(registerUser);
        }

        private async Task<TokenDto> GerarJwt(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            var identityClaims = new ClaimsIdentity();
            identityClaims.AddClaims(await _userManager.GetClaimsAsync(user));

            DateTime dataCriacao = DateTime.UtcNow;
            DateTime dataExpiracao = DateTime.UtcNow.AddHours(_appSettings.Expires);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var securityToken = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = _appSettings.Issuer,
                Audience = _appSettings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Subject = identityClaims,
                NotBefore = dataCriacao,
                Expires = dataExpiracao
            });
            var token = tokenHandler.WriteToken(securityToken);

            return new TokenDto()
            {
                Authenticated = true,
                Email = user.Email,
                Name = user.UserName,
                Created = dataCriacao.ToString("yyyy-MM-dd HH:mm:ss"),
                Expiration = dataExpiracao.ToString("yyyy-MM-dd HH:mm:ss"),
                Token = "Bearer " + token,
                Message = "Token gerado com sucesso"
            };
        }
    }
}
