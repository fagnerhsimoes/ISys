using System;
using ISys.Domain.Validations;

namespace ISys.Domain.Commands
{
    public class RemoveRoomCommand : RoomCommand
    {
        public RemoveRoomCommand(Guid id)
        {
            Id = id;
            AggregateId = id;
        }

        public override bool IsValid()
        {
            ValidationResult = new RemoveRoomCommandValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}