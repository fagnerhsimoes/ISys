using System.ComponentModel.DataAnnotations;

namespace ISys.Infra.CrossCutting.Identity.Models.AccountViewModels
{
    public class LoginWithRecoveryCodeViewModel
    {
            [Required]
            [DataType(DataType.Text)]
            [Display(Name = "Código de Recuperação")]
            public string RecoveryCode { get; set; }
    }
}
