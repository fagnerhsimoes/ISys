using ISys.Domain.Commands;

namespace ISys.Domain.Validations
{
    public class ParcelamentoNewCommandValidation : ParcelamentoValidation<ParcelamentoNewCommand>
    {
        public ParcelamentoNewCommandValidation()
        {
            ValidateId();
        }
    }
}