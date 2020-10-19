using System;
using ISys.Domain.Core.Events;

namespace ISys.Domain.Events
{
    public class ReservationRegisteredEvent : Event
    {
        public ReservationRegisteredEvent(Guid id, string title, DateTime dateInitial, DateTime dateFinal, Guid roomId)
        {
            Id = id;
            Title = title;
            DateInitial = dateInitial;
            DateFinal = dateFinal;
            RoomId = roomId;
            AggregateId = id;
        }
        public Guid Id { get; set; }

        public string Title { get; private set; }

        public DateTime DateInitial { get; private set; }

        public DateTime DateFinal { get; private set; }
        public Guid RoomId { get; private set; }
    }
}