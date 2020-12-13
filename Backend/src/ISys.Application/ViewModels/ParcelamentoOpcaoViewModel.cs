
namespace ISys.Application.ViewModels
{
    public class ParcelamentoOpcaoViewModel
    {
        public ParcelamentoOpcaoViewModel(int quantidadeParcelas, decimal valorParcela)
        {
            QuantidadeParcelas = quantidadeParcelas;
            ValorParcela       = valorParcela;
        }
        public int     QuantidadeParcelas { get; private set; }
        public decimal ValorParcela       { get; private set; }

    }
}
