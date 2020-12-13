using System;
using System.Collections.Generic;
using System.Linq;

namespace ISys.Application.ViewModels
{
    public class ResultParcelamentoParcelasViewModel
    {
        private IList<ParcelamentoParcelaViewModel> _parcelas;

        public ResultParcelamentoParcelasViewModel()
        {
            _parcelas = new List<ParcelamentoParcelaViewModel>();
        }
        public IReadOnlyCollection<ParcelamentoParcelaViewModel> Parcelas { get { return _parcelas.ToArray(); } }

        public void AddParcela(ParcelamentoParcelaViewModel parcela)
        {
            _parcelas.Add(parcela);
        }
    }


    public class ParcelamentoParcelaViewModel
    {
        public ParcelamentoParcelaViewModel(int numeroParcela, decimal valorParcela, DateTime primeiroVencimento, 
                                            int tipoIntervaloVencimento, int intervaloVencimento)
        {
            NumeroParcela     = numeroParcela;
            ValorParcela      = valorParcela;
            VencimentoParcela = AddVencimento(numeroParcela, primeiroVencimento, intervaloVencimento, tipoIntervaloVencimento);
        }

        public DateTime AddVencimento(int numeroParcela, DateTime primeiroVencimento, int intervaloVencimento, int tipoIntervaloVencimento)
        {
            var vencimento = primeiroVencimento;
            if (numeroParcela != 1)
            {
                for (int i = 1; i < numeroParcela; i++)
                {
                    if (tipoIntervaloVencimento == 0)
                        vencimento = vencimento.AddDays(intervaloVencimento);
                    else
                        vencimento = vencimento.AddMonths(intervaloVencimento);
                }
            }
            return vencimento;
        }

        public int      NumeroParcela     { get; private set; }
        public decimal  ValorParcela      { get; private set; }
        public DateTime VencimentoParcela { get; private set; }
    }
}
