using System;
using ISys.Domain.Core.Commands;
using ISys.Domain.Models;

namespace ISys.Domain.Commands
{
    public abstract class ReservationCommand : Command
    {
        public Guid Id { get; protected set; }
        public string Title { get; protected set; }
        public DateTime DateInitial { get; protected set; }
        public DateTime DateFinal { get; protected set; }
        public Guid RoomId { get; protected set; }
        public Room Room { get; protected set; }
    }
}