using System;
using ISys.Domain.Validations;

namespace ISys.Domain.Commands
{
    public class UpdateRoomCommand : RoomCommand
    {
        public UpdateRoomCommand(Guid id, string description)
        {
            Id = id;
            Description = description;
        }

        public override bool IsValid()
        {
            ValidationResult = new UpdateRoomCommandValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}