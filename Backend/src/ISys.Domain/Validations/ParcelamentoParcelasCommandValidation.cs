using ISys.Domain.Commands;

namespace ISys.Domain.Validations
{
    public class ParcelamentoParcelasCommandValidation : ParcelamentoValidation<ParcelamentoParcelasCommand>
    {
        public ParcelamentoParcelasCommandValidation()
        {
            ValidateQuantidadeParcela();
            ValidateValorParcela();
            ValidatePrimeiroVencimento();
            ValidateTipoIntervaloVencimento();
            ValidateIntervaloVencimento();
        }
    }
}