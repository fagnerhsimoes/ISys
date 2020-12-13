using System;
using ISys.Domain.Models;
using ISys.Domain.Validations;

namespace ISys.Domain.Commands
{
    public class UpdateReservationCommand : ReservationCommand
    {
        public UpdateReservationCommand(Guid id, string title, DateTime dateInitial, DateTime dateFinal, Guid roomId, Room room)
        {
            Id = id;
            Title = title;
            DateInitial = dateInitial;
            DateFinal = dateFinal;
            RoomId = roomId;
            Room    = room;
        }

        public override bool IsValid()
        {
            ValidationResult = new UpdateReservationCommandValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}