using System;
using ISys.Domain.Core.Events;

namespace ISys.Domain.Events
{
    public class RoomRemovedEvent : Event
    {
        public RoomRemovedEvent(Guid id)
        {
            Id = id;
            AggregateId = id;
        }

        public Guid Id { get; set; }
    }
}