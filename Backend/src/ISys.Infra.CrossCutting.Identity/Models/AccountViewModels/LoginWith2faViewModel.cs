using System.ComponentModel.DataAnnotations;

namespace ISys.Infra.CrossCutting.Identity.Models.AccountViewModels
{
    public class LoginWith2faViewModel
    {
        [Required]
        [StringLength(7, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres.", MinimumLength = 6)]
        [DataType(DataType.Text)]
        [Display(Name = "Código de autenticação")]
        public string TwoFactorCode { get; set; }

        [Display(Name = "Lembrar-Me desta Máquina")]
        public bool RememberMachine { get; set; }

        public bool RememberMe { get; set; }
    }
}
