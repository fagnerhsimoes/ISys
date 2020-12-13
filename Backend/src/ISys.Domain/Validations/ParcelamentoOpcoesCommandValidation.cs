using ISys.Domain.Commands;

namespace ISys.Domain.Validations
{
    public class ParcelamentoOpcoesCommandValidation : ParcelamentoValidation<ParcelamentoOpcoesCommand>
    {
        public ParcelamentoOpcoesCommandValidation()
        {
            ValidateValorEntrada();
            ValidateValorTotal();
            ValidateMaximoParcelas();
            ValidateMinimoParcela();
        }
    }
}