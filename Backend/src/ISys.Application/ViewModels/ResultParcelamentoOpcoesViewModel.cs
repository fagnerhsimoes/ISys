using System.Collections.Generic;
using System.Linq;

namespace ISys.Application.ViewModels
{
    public class ResultParcelamentoOpcoesViewModel
    {
        private IList<ParcelamentoOpcaoViewModel> _parcelamentoOpcoes;

        public ResultParcelamentoOpcoesViewModel(decimal valorTotal, decimal valorEntrada)
        {
            ValorTotal = valorTotal;
            ValorEntrada = valorEntrada;
            _parcelamentoOpcoes = new List<ParcelamentoOpcaoViewModel>();
        }

        public decimal ValorTotal    { get; private set; }
        public decimal ValorEntrada  { get; private set; }
        public IReadOnlyCollection<ParcelamentoOpcaoViewModel> Opcoes { get { return _parcelamentoOpcoes.ToArray(); } }

        public void AddOpcao(ParcelamentoOpcaoViewModel opcao)
        {
            _parcelamentoOpcoes.Add(opcao);
        }
        public bool ValidaMinimoParcela(int qtdParcela, decimal minimoParcela, decimal valorParcelar)
        {
            return ((valorParcelar / qtdParcela) >= minimoParcela);
        }

    }
}
