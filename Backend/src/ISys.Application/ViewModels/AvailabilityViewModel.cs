using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ISys.Application.ViewModels
{
    public class AvailabilityViewModel
    {
        
        [Required(ErrorMessage = "A Data Inicial é Obrigatória")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd hh:mm:ss}")]
        [DataType(DataType.DateTime, ErrorMessage = "Data e Hora em formato inválido")]
        [DisplayName("DateInitial")]
        public DateTime DateInitial { get; set; }

        [Required(ErrorMessage = "A Data Final é Obrigatória")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd hh:mm:ss}")]
        [DataType(DataType.Date, ErrorMessage = "Data e hora em formato inválido")]
        [DisplayName("DateFinal")]
        public DateTime DateFinal { get; set; }
    }
}
