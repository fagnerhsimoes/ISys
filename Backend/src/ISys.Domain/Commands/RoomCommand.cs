using System;
using ISys.Domain.Core.Commands;

namespace ISys.Domain.Commands
{
    public abstract class RoomCommand : Command
    {
        public Guid Id { get; protected set; }

        public string Description { get; protected set; }
    }
}