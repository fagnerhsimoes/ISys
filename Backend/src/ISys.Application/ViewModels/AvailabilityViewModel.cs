using ISys.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace ISys.Application.ViewModels
{
    public class AvailabilityViewModel
    {
        
        [Required(ErrorMessage = "The DateInitial is Required")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd hh:mm:ss}")]
        [DataType(DataType.DateTime, ErrorMessage = "Data em formato inválido")]
        [DisplayName("DateInitial")]
        public DateTime DateInitial { get; set; }

        [Required(ErrorMessage = "The DateFinal is Required")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        [DataType(DataType.Date, ErrorMessage = "Data em formato inválido")]
        [DisplayName("DateFinal")]
        public DateTime DateFinal { get; set; }
    }
}
