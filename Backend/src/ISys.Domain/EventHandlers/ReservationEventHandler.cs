using System.Threading;
using System.Threading.Tasks;
using ISys.Domain.Events;
using MediatR;

namespace ISys.Domain.EventHandlers
{
    public class ReservationEventHandler :
        INotificationHandler<ReservationRegisteredEvent>,
        INotificationHandler<ReservationUpdatedEvent>,
        INotificationHandler<ReservationRemovedEvent>
    {
        public Task Handle(ReservationUpdatedEvent message, CancellationToken cancellationToken)
        {
            // Send some notification e-mail

            return Task.CompletedTask;
        }

        public Task Handle(ReservationRegisteredEvent message, CancellationToken cancellationToken)
        {
            // Send some greetings e-mail

            return Task.CompletedTask;
        }

        public Task Handle(ReservationRemovedEvent message, CancellationToken cancellationToken)
        {
            // Send some see you soon e-mail

            return Task.CompletedTask;
        }
    }
}