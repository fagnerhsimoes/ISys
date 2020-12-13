using System;
using ISys.Domain.Validations;

namespace ISys.Domain.Commands
{
    public class ParcelamentoOpcoesCommand : ParcelamentoCommand
    {
        public ParcelamentoOpcoesCommand(decimal valorEntrada, decimal valorTotal, int maximoParcelas, decimal minimoParcela)
        {
            ValorEntrada   = valorEntrada;
            ValorTotal     = valorTotal;
            MaximoParcelas = maximoParcelas;
            MinimoParcela  = minimoParcela;
        }

        public override bool IsValid()
        {
            ValidationResult = new ParcelamentoOpcoesCommandValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}