using System;
using ISys.Domain.Core.Events;

namespace ISys.Domain.Events
{
    public class RoomUpdatedEvent : Event
    {
        public RoomUpdatedEvent(Guid id, string description)
        {
            Id = id;
            Description = description;
            AggregateId = id;
        }
        public Guid Id { get; set; }

        public string Description { get; private set; }

    }
}