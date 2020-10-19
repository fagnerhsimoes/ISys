using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ISys.Infra.CrossCutting.Identity.Authorization;
using ISys.Infra.CrossCutting.Identity.Configurations;
using ISys.Infra.CrossCutting.Identity.Models;
using ISys.Infra.CrossCutting.IoC;
using ISys.Services.Api.Configurations;
using MediatR;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;




namespace ISys.Services.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentityConfiguration(Configuration);
            services.AddStoreConfigurations(Configuration);
            services.AddEventStoreConfiguration(Configuration);


            services.AddCors();
            services.AddControllers();

            services.AddAutoMapperSetup();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("CanWriteRoomData", policy => policy.Requirements.Add(new ClaimRequirement("Room", "Write")));
                options.AddPolicy("CanRemoveRoomData", policy => policy.Requirements.Add(new ClaimRequirement("Room", "Remove")));
                options.AddPolicy("CanWriteReservationData", policy => policy.Requirements.Add(new ClaimRequirement("Reservation", "Write")));
                options.AddPolicy("CanRemoveReservationData", policy => policy.Requirements.Add(new ClaimRequirement("Reservation", "Remove")));
            });



            // JWT
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = true;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = appSettings.Audience,
                    ValidIssuer = appSettings.Issuer,

                    // Verifica se um token recebido ainda é válido
                    ValidateLifetime = true,

                    // Tempo de tolerância para a expiração de um token (utilizado
                    // caso haja problemas de sincronismo de horário entre diferentes
                    // computadores envolvidos no processo de comunicação)
                    ClockSkew = TimeSpan.Zero

                };
            });

            services.AddMediatR(typeof(Startup));
            RegisterServices(services);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseGlobalizationConfig();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private static void RegisterServices(IServiceCollection services)
        {
            NativeInjectorBootStrapper.RegisterServices(services);
        }
    }
}
