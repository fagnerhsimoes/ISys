using System;
using ISys.Domain.Core.Events;

namespace ISys.Domain.Events
{
    public class ReservationRemovedEvent : Event
    {
        public ReservationRemovedEvent(Guid id)
        {
            Id = id;
            AggregateId = id;
        }

        public Guid Id { get; set; }
    }
}