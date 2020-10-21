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
    public class ReservationCommandHandler : CommandHandler,
        IRequestHandler<RegisterNewReservationCommand, bool>,
        IRequestHandler<UpdateReservationCommand, bool>,
        IRequestHandler<RemoveReservationCommand, bool>
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IMediatorHandler Bus;

        public ReservationCommandHandler(IReservationRepository reservationRepository,
                                      IUnitOfWork uow,
                                      IMediatorHandler bus,
                                      INotificationHandler<DomainNotification> notifications) : base(uow, bus, notifications)
        {
            _reservationRepository = reservationRepository;
            Bus = bus;
        }

        public Task<bool> Handle(RegisterNewReservationCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid())
            {
                NotifyValidationErrors(message);
                return Task.FromResult(false);
            }

            var reservation = new Reservation(message.Id, message.Title, message.DateInitial, message.DateFinal, message.RoomId);

            if (_reservationRepository.GetByTitle(reservation.Title) != null)
            {
                Bus.RaiseEvent(new DomainNotification(message.MessageType, "Já existe uma Reserva com este Título."));
                return Task.FromResult(false);
            }

            _reservationRepository.Add(reservation);

            if (Commit())
            {
                Bus.RaiseEvent(new ReservationRegisteredEvent(reservation.Id, reservation.Title, reservation.DateInitial, reservation.DateFinal, reservation.RoomId));
            }

            return Task.FromResult(true);
        }

        public Task<bool> Handle(UpdateReservationCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid())
            {
                NotifyValidationErrors(message);
                return Task.FromResult(false);
            }

            var reservation = new Reservation(message.Id, message.Title, message.DateInitial, message.DateFinal, message.RoomId);
            var existingReservation = _reservationRepository.GetByTitle(reservation.Title);

            if (existingReservation != null && existingReservation.Id != reservation.Id)
            {
                if (!existingReservation.Equals(reservation))
                {
                    Bus.RaiseEvent(new DomainNotification(message.MessageType, "Já existe uma Reserva com este Título."));
                    return Task.FromResult(false);
                }
            }

            _reservationRepository.Update(reservation);

            if (Commit())
            {
                Bus.RaiseEvent(new ReservationUpdatedEvent(reservation.Id, reservation.Title, reservation.DateInitial, reservation.DateFinal, reservation.RoomId));
            }

            return Task.FromResult(true);
        }

        public Task<bool> Handle(RemoveReservationCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid())
            {
                NotifyValidationErrors(message);
                return Task.FromResult(false);
            }

            _reservationRepository.Remove(message.Id);

            if (Commit())
            {
                Bus.RaiseEvent(new ReservationRemovedEvent(message.Id));
            }

            return Task.FromResult(true);
        }

        public void Dispose()
        {
            _reservationRepository.Dispose();
        }
    }
}