using System;
using ISys.Domain.Validations;

namespace ISys.Domain.Commands
{
    public class ParcelamentoParcelasCommand : ParcelamentoCommand
    {
        public ParcelamentoParcelasCommand(int quantidadeParcela, decimal valorParcela, DateTime primeiroVencimento, int tipoIntervaloVencimento, int intervaloVencimento)
        {
           QuantidadeParcela        = quantidadeParcela       ;
           ValorParcela             = valorParcela            ;
           PrimeiroVencimento       = primeiroVencimento      ;
           TipoIntervaloVencimento  = tipoIntervaloVencimento ;
           IntervaloVencimento      = intervaloVencimento     ;
        }

        public override bool IsValid()
        {
            ValidationResult = new ParcelamentoParcelasCommandValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}