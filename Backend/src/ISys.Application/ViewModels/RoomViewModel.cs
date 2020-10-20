using ISys.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ISys.Application.ViewModels
{
    public class RoomViewModel
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Description")]
        [MinLength(2)]
        [MaxLength(100)]
        [DisplayName("Description")]
        public string Description { get; set; }

        public virtual Reservation Reservation { get; set; }

        public IList<ReservationViewModel> Reservations { get; set; }

    }
}
