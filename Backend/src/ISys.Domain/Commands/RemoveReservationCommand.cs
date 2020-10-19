using System;
using ISys.Domain.Validations;

namespace ISys.Domain.Commands
{
    public class RemoveReservationCommand : ReservationCommand
    {
        public RemoveReservationCommand(Guid id)
        {
            Id = id;
            AggregateId = id;
        }

        public override bool IsValid()
        {
            ValidationResult = new RemoveReservationCommandValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}