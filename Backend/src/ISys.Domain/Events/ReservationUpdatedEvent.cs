using System;
using ISys.Domain.Core.Events;

namespace ISys.Domain.Events
{
    public class ReservationUpdatedEvent : Event
    {
        public ReservationUpdatedEvent(Guid id, string name, DateTime dateInicial, DateTime dateFinal, Guid roomId)
        {
            Id = id;
            Title = name;
            DateInicial = dateInicial;
            DateFinal = dateFinal;
            RoomId = roomId;
            AggregateId = id;
        }
        public Guid Id { get; set; }
        public string Title { get; private set; }
        public DateTime DateInicial { get; private set; }
        public DateTime DateFinal { get; private set; }
        public Guid RoomId { get; private set; }
    }
}