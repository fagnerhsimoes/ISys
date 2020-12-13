using System;
using ISys.Domain.Core.Models;

namespace ISys.Domain.Models
{
    public class Reservation : Entity
    {
        public Reservation(Guid id, string title, DateTime dateInitial, DateTime dateFinal, Guid roomId)
        {
            Id = id;
            Title = title;
            DateInitial = dateInitial;
            DateFinal = dateFinal;
            RoomId = roomId;
        }

        // Empty constructor for EF
        protected Reservation() { }

        public string Title { get; private set; }
        public DateTime DateInitial { get; private set; }
        public DateTime DateFinal { get; private set; }
        public Guid RoomId { get; set; }
        public Room Room { get; set; }
    }
}