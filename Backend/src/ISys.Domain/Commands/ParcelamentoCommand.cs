using System;
using ISys.Domain.Core.Commands;
using ISys.Domain.Models;

namespace ISys.Domain.Commands
{
    public abstract class ParcelamentoCommand : Command
    {
        public Guid Id { get; protected set; }
        public DateTime PrimeiroVencimento { get; protected set; }
        public DateTime VencimentoParcela { get; protected set; }
        public decimal ValorEntrada { get; protected set; }
        public decimal ValorTotal { get; protected set; }
        public decimal MinimoParcela { get; protected set; }
        public decimal ValorParcela { get; protected set; }
        public int MaximoParcelas { get; protected set; }
        public int QuantidadeParcela { get; protected set; }
        public int IntervaloVencimento { get; protected set; }
        public int NumeroParcela { get; protected set; }
        public int TipoIntervaloVencimento { get; protected set; }
    }
}