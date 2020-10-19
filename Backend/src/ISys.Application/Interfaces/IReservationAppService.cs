using System;
using System.Collections.Generic;
using ISys.Application.EventSourcedNormalizers;
using ISys.Application.ViewModels;

namespace ISys.Application.Interfaces
{
    public interface IReservationAppService : IDisposable
    {
        void Register(ReservationViewModel ReservationViewModel);
        IEnumerable<ReservationViewModel> GetAll();
        IEnumerable<ReservationViewModel> GetAllByRoom(Guid roomId);
        IEnumerable<ReservationViewModel> GetAvailability(AvailabilityViewModel availabilityViewModel);
        ReservationViewModel GetById(Guid id);
        void Update(ReservationViewModel ReservationViewModel);
        void Remove(Guid id);
        IList<ReservationHistoryData> GetAllHistory(Guid id);
    }
}
