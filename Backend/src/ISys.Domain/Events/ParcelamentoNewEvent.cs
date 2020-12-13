using System;
using ISys.Domain.Core.Events;

namespace ISys.Domain.Events
{
    public class ParcelamentoNewEvent : Event
    {
        public ParcelamentoNewEvent(Guid id)
        {
            Id = id;
            AggregateId = id;
        }
        public Guid Id { get; set; }

    }
}