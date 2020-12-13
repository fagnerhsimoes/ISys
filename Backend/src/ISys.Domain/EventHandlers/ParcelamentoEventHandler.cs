using System.Threading;
using System.Threading.Tasks;
using ISys.Domain.Events;
using MediatR;

namespace ISys.Domain.EventHandlers
{
    public class ParcelamentoEventHandler :
        INotificationHandler<ParcelamentoNewEvent>
    {

        public Task Handle(ParcelamentoNewEvent message, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}