using System;
using ISys.Domain.Models;
using ISys.Domain.Validations;

namespace ISys.Domain.Commands
{
    public class RegisterNewReservationCommand : ReservationCommand
    {
        public RegisterNewReservationCommand(string title, DateTime dateInitial, DateTime dateFinal, Guid roomId, Room room)
        {
            Title = title;
            DateInitial = dateInitial;
            DateFinal = dateFinal;
            RoomId = roomId;
            Room = room;
        }

        public override bool IsValid()
        {
            ValidationResult = new RegisterNewReservationCommandValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}