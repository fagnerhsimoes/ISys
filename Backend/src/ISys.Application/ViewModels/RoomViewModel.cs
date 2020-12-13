using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;


namespace ISys.Application.ViewModels
{
    public class RoomViewModel
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "A Descrição é Obrigatória")]
        [MinLength(2)]
        [MaxLength(100)]
        [DisplayName("Description")]
        public string Description { get; set; }

    }
}
