using ISys.Application.ViewModels;
using System;
using System.Linq.Expressions;

namespace ISys.Application.Queries
{
    public static class ReservationQueries
    {
        public static Expression<Func<ReservationViewModel, bool>> GetReservationsByRoom(Guid roomId)
        {
            return x => x.RoomId == roomId;
        }

        public static Expression<Func<ReservationViewModel, bool>> GetNotAvailability(AvailabilityViewModel availabilityViewModel)
        {
            return x => ((x.DateInitial < availabilityViewModel.DateInitial && x.DateFinal > availabilityViewModel.DateFinal)
                      || (availabilityViewModel.DateInitial > x.DateInitial && availabilityViewModel.DateInitial < x.DateFinal)
                      || (availabilityViewModel.DateFinal   > x.DateInitial && availabilityViewModel.DateInitial < x.DateFinal));
        }
    }
}