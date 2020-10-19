using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ISys.Application.EventSourcedNormalizers;
using ISys.Application.Interfaces;
using ISys.Application.Queries;
using ISys.Application.ViewModels;
using ISys.Domain.Commands;
using ISys.Domain.Core.Bus;
using ISys.Domain.Interfaces;
using ISys.Infra.Data.Repository.EventSourcing;

namespace ISys.Application.Services
{
    public class ReservationAppService : IReservationAppService
    {
        private readonly IMapper _mapper;
        private readonly IReservationRepository _ReservationRepository;
        private readonly IEventStoreRepository _eventStoreRepository;
        private readonly IMediatorHandler Bus;
        private IEnumerable<ReservationViewModel> _Reservations;

        public ReservationAppService(IMapper mapper,
                                  IReservationRepository ReservationRepository,
                                  IMediatorHandler bus,
                                  IEventStoreRepository eventStoreRepository)
        {
            _mapper = mapper;
            _ReservationRepository = ReservationRepository;
            Bus = bus;
            _eventStoreRepository = eventStoreRepository;
            _Reservations = this.GetAll();
        }

        public IEnumerable<ReservationViewModel> GetAll()
        {
            return _ReservationRepository.GetAll().ProjectTo<ReservationViewModel>(_mapper.ConfigurationProvider);
        }

        public IEnumerable<ReservationViewModel> GetAllByRoom(Guid roomId)
        {
            var exp = ReservationQueries.GetReservationsByRoom(roomId);

            var Reservation = _Reservations.AsQueryable().Where(exp).ToList();

            return Reservation;
        }

        public IEnumerable<ReservationViewModel> GetReservationActive(Guid roomId, DateTime dateInitial, DateTime dateFinal)
        {
            var exp = ReservationQueries.CheckAvailability(roomId, dateInitial, dateFinal);

            var Reservation = _Reservations.AsQueryable().Where(exp).ToList();

            return Reservation;
        }

        public ReservationViewModel GetById(Guid id)
        {
            return _mapper.Map<ReservationViewModel>(_ReservationRepository.GetById(id));
        }

        public void Register(ReservationViewModel ReservationViewModel)
        {
            var registerCommand = _mapper.Map<RegisterNewReservationCommand>(ReservationViewModel);
            Bus.SendCommand(registerCommand);
        }

        public void Update(ReservationViewModel ReservationViewModel)
        {
            var updateCommand = _mapper.Map<UpdateReservationCommand>(ReservationViewModel);
            Bus.SendCommand(updateCommand);
        }

        public void Remove(Guid id)
        {
            var removeCommand = new RemoveReservationCommand(id);
            Bus.SendCommand(removeCommand);
        }

        public IList<ReservationHistoryData> GetAllHistory(Guid id)
        {
            return ReservationHistory.ToJavaScriptReservationHistory(_eventStoreRepository.All(id));
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
