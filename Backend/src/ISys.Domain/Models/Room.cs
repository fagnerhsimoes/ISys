using System;
using System.Collections.Generic;
using ISys.Domain.Core.Models;

namespace ISys.Domain.Models
{
    public class Room : Entity
    {
        public Room(Guid id, string description)
        {
            Id = id;
            Description = description;
        }

        // Empty constructor for EF
        protected Room() { }

        public string Description { get; private set; }

        public IEnumerable<Reservation> Reservations { get; set; }
    }
}