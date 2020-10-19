using System;
using System.Collections.Generic;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ISys.Application.EventSourcedNormalizers;
using ISys.Application.Interfaces;
using ISys.Application.ViewModels;
using ISys.Domain.Commands;
using ISys.Domain.Core.Bus;
using ISys.Domain.Interfaces;
using ISys.Infra.Data.Repository.EventSourcing;

namespace ISys.Application.Services
{
    public class RoomAppService : IRoomAppService
    {
        private readonly IMapper _mapper;
        private readonly IRoomRepository _RoomRepository;
        private readonly IEventStoreRepository _eventStoreRepository;
        private readonly IMediatorHandler Bus;

        public RoomAppService(IMapper mapper,
                                  IRoomRepository RoomRepository,
                                  IMediatorHandler bus,
                                  IEventStoreRepository eventStoreRepository)
        {
            _mapper = mapper;
            _RoomRepository = RoomRepository;
            Bus = bus;
            _eventStoreRepository = eventStoreRepository;
        }

        public IEnumerable<RoomViewModel> GetAll()
        {
            return _RoomRepository.GetAll().ProjectTo<RoomViewModel>(_mapper.ConfigurationProvider);
        }

        public RoomViewModel GetById(Guid id)
        {
            return _mapper.Map<RoomViewModel>(_RoomRepository.GetById(id));
        }

        public void Register(RoomViewModel RoomViewModel)
        {
            var registerCommand = _mapper.Map<RegisterNewRoomCommand>(RoomViewModel);
            Bus.SendCommand(registerCommand);
        }

        public void Update(RoomViewModel RoomViewModel)
        {
            var updateCommand = _mapper.Map<UpdateRoomCommand>(RoomViewModel);
            Bus.SendCommand(updateCommand);
        }

        public void Remove(Guid id)
        {
            var removeCommand = new RemoveRoomCommand(id);
            Bus.SendCommand(removeCommand);
        }

        public IList<RoomHistoryData> GetAllHistory(Guid id)
        {
            return RoomHistory.ToJavaScriptRoomHistory(_eventStoreRepository.All(id));
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
