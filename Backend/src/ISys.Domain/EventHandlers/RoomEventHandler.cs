using System.Threading;
using System.Threading.Tasks;
using ISys.Domain.Events;
using MediatR;

namespace ISys.Domain.EventHandlers
{
    public class RoomEventHandler :
        INotificationHandler<RoomRegisteredEvent>,
        INotificationHandler<RoomUpdatedEvent>,
        INotificationHandler<RoomRemovedEvent>
    {
        public Task Handle(RoomUpdatedEvent message, CancellationToken cancellationToken)
        {
            // Send some notification e-mail

            return Task.CompletedTask;
        }

        public Task Handle(RoomRegisteredEvent message, CancellationToken cancellationToken)
        {
            // Send some greetings e-mail

            return Task.CompletedTask;
        }

        public Task Handle(RoomRemovedEvent message, CancellationToken cancellationToken)
        {
            // Send some see you soon e-mail

            return Task.CompletedTask;
        }
    }
}