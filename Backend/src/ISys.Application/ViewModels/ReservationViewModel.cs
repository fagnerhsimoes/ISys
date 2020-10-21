using ISys.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace ISys.Application.ViewModels
{
    public class ReservationViewModel
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O Título é Obrigatório")]
        [MinLength(3)]
        [MaxLength(100)]
        [DisplayName("Title")]
        public string Title { get; set; }

        [Required(ErrorMessage = "A Data e Hora de Inicio é Obrigatória")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd hh:mm:ss}")]
        [DataType(DataType.DateTime, ErrorMessage = "Data em formato inválido")]
        [DisplayName("DateInitial")]
        public DateTime DateInitial { get; set; }

        [Required(ErrorMessage = "A Data e Hora Final é Obrigatória")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        [DataType(DataType.Date, ErrorMessage = "Data em formato inválido")]
        [DisplayName("DateFinal")]
        public DateTime DateFinal { get; set; }

        [Required(ErrorMessage = "A Sala é Obrigatória")]
        [DisplayName("RoomId")]
        public Guid RoomId { get; set; }


        [ForeignKey(nameof(RoomId))]
        public virtual Room Room { get; set; }

        public IList<RoomViewModel> Rooms { get; set; }
    }
}
