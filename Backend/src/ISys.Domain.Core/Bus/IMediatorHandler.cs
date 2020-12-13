using System.Threading.Tasks;
using ISys.Domain.Core.Commands;
using ISys.Domain.Core.Events;


namespace ISys.Domain.Core.Bus
{
    public interface IMediatorHandler
    {
        Task SendCommand<T>(T command) where T : Command;
        Task RaiseEvent<T>(T @event) where T : Event;
    }
}
