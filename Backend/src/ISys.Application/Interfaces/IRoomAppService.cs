using System;
using System.Collections.Generic;
using ISys.Application.EventSourcedNormalizers;
using ISys.Application.ViewModels;

namespace ISys.Application.Interfaces
{
    public interface IRoomAppService : IDisposable
    {
        void Register(RoomViewModel RoomViewModel);
        IEnumerable<RoomViewModel> GetAll();
        RoomViewModel GetById(Guid id);
        void Update(RoomViewModel RoomViewModel);
        void Remove(Guid id);
        IList<RoomHistoryData> GetAllHistory(Guid id);
    }
}
