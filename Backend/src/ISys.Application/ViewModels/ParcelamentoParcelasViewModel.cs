using System;

namespace ISys.Application.ViewModels
{
    public class ParcelamentoParcelasViewModel
    {
        public int       QuantidadeParcelas      { get; set; }
        public decimal   ValorParcela            { get; set; }
        public DateTime  PrimeiroVencimento      { get; set; }
        public int       TipoIntervaloVencimento { get; set; }
        public int       IntervaloVencimento     { get; set; }

    }
}
