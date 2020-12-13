using System;
using ISys.Domain.Validations;

namespace ISys.Domain.Commands
{
    public class ParcelamentoNewCommand : ParcelamentoCommand
    {
        public ParcelamentoNewCommand(Guid idParcelamento)
        {
            Id = idParcelamento;
        }

        public override bool IsValid()
        {
            ValidationResult = new ParcelamentoNewCommandValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}