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
    public class ParcelamentoCommandHandler : CommandHandler,
        IRequestHandler<ParcelamentoNewCommand, bool>,
        IRequestHandler<ParcelamentoOpcoesCommand, bool>,
        IRequestHandler<ParcelamentoParcelasCommand, bool>
    {
        private readonly IParcelamentoRepository _ParcelamentoRepository;
        private readonly IMediatorHandler Bus;

        public ParcelamentoCommandHandler(IParcelamentoRepository ParcelamentoRepository, 
                                      IUnitOfWork uow,
                                      IMediatorHandler bus,
                                      INotificationHandler<DomainNotification> notifications) :base(uow, bus, notifications)
        {
            _ParcelamentoRepository = ParcelamentoRepository;
            Bus = bus;
        }

        public Task<bool> Handle(ParcelamentoNewCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid())
            {
                NotifyValidationErrors(message);
                return Task.FromResult(false);
            }

           /* var Parcelamento = new Parcelamento(message.Id, message.Description);

            if (_ParcelamentoRepository.GetByDescription(Parcelamento.Description) != null)
            {
                Bus.RaiseEvent(new DomainNotification(message.MessageType, "Já existe um Parcelamento com este ID."));
                return Task.FromResult(false);
            }
            
            _ParcelamentoRepository.Add(Parcelamento);

            if (Commit())
            {
                Bus.RaiseEvent(new ParcelamentoRegisteredEvent(Parcelamento.Id, Parcelamento.Description));
            }*/

            return Task.FromResult(true);
        }

        public Task<bool> Handle(ParcelamentoOpcoesCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid())
            {
                NotifyValidationErrors(message);
                return Task.FromResult(false);
            }

           /* var Parcelamento = new Parcelamento(message.Id, message.Description);
            var existingParcelamento = _ParcelamentoRepository.GetByDescription(Parcelamento.Description);

            if (existingParcelamento != null && existingParcelamento.Id != Parcelamento.Id)
            {
                if (!existingParcelamento.Equals(Parcelamento))
                {
                    Bus.RaiseEvent(new DomainNotification(message.MessageType, "Já existe uma Sala com esta Descrição."));
                    return Task.FromResult(false);
                }
            }

            _ParcelamentoRepository.Update(Parcelamento);

            if (Commit())
            {
                Bus.RaiseEvent(new ParcelamentoUpdatedEvent(Parcelamento.Id, Parcelamento.Description));
            }*/

            return Task.FromResult(true);
        }

        public Task<bool> Handle(ParcelamentoParcelasCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid())
            {
                NotifyValidationErrors(message);
                return Task.FromResult(false);
            }

            //_ParcelamentoRepository.Remove(message.Id);

            /*if (Commit())
            {
                Bus.RaiseEvent(new ParcelamentoRemovedEvent(message.Id));
            }*/

            return Task.FromResult(true);
        }

        public void Dispose()
        {
            _ParcelamentoRepository.Dispose();
        }
    }
}