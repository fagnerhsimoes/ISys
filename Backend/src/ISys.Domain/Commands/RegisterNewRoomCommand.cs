using System;
using ISys.Domain.Validations;

namespace ISys.Domain.Commands
{
    public class RegisterNewRoomCommand : RoomCommand
    {
        public RegisterNewRoomCommand(string description)
        {
            Description = description;
        }

        public override bool IsValid()
        {
            ValidationResult = new RegisterNewRoomCommandValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}