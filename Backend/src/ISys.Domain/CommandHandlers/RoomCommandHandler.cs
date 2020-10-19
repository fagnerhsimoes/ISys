using System;
using System.Threading;
using System.Threading.Tasks;
using ISys.Domain.Commands;
using ISys.Domain.Core.Bus;
using ISys.Domain.Core.Notifications;
using ISys.Domain.Events;
using ISys.Domain.Interfaces;
using ISys.Domain.Models;
using MediatR;

namespace ISys.Domain.CommandHandlers
{
    public class RoomCommandHandler : CommandHandler,
        IRequestHandler<RegisterNewRoomCommand, bool>,
        IRequestHandler<UpdateRoomCommand, bool>,
        IRequestHandler<RemoveRoomCommand, bool>
    {
        private readonly IRoomRepository _RoomRepository;
        private readonly IMediatorHandler Bus;

        public RoomCommandHandler(IRoomRepository RoomRepository, 
                                      IUnitOfWork uow,
                                      IMediatorHandler bus,
                                      INotificationHandler<DomainNotification> notifications) :base(uow, bus, notifications)
        {
            _RoomRepository = RoomRepository;
            Bus = bus;
        }

        public Task<bool> Handle(RegisterNewRoomCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid())
            {
                NotifyValidationErrors(message);
                return Task.FromResult(false);
            }

            var Room = new Room(message.Id, message.Description);

            if (_RoomRepository.GetByDescription(Room.Description) != null)
            {
                Bus.RaiseEvent(new DomainNotification(message.MessageType, "The Room Description has already been taken."));
                return Task.FromResult(false);
            }
            
            _RoomRepository.Add(Room);

            if (Commit())
            {
                Bus.RaiseEvent(new RoomRegisteredEvent(Room.Id, Room.Description));
            }

            return Task.FromResult(true);
        }

        public Task<bool> Handle(UpdateRoomCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid())
            {
                NotifyValidationErrors(message);
                return Task.FromResult(false);
            }

            var Room = new Room(message.Id, message.Description);
            var existingRoom = _RoomRepository.GetByDescription(Room.Description);

            if (existingRoom != null && existingRoom.Id != Room.Id)
            {
                if (!existingRoom.Equals(Room))
                {
                    Bus.RaiseEvent(new DomainNotification(message.MessageType, "The Room Description has already been taken."));
                    return Task.FromResult(false);
                }
            }

            _RoomRepository.Update(Room);

            if (Commit())
            {
                Bus.RaiseEvent(new RoomUpdatedEvent(Room.Id, Room.Description));
            }

            return Task.FromResult(true);
        }

        public Task<bool> Handle(RemoveRoomCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid())
            {
                NotifyValidationErrors(message);
                return Task.FromResult(false);
            }

            _RoomRepository.Remove(message.Id);

            if (Commit())
            {
                Bus.RaiseEvent(new RoomRemovedEvent(message.Id));
            }

            return Task.FromResult(true);
        }

        public void Dispose()
        {
            _RoomRepository.Dispose();
        }
    }
}