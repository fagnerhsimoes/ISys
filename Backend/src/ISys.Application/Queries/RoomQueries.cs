using ISys.Application.ViewModels;
using System;
using System.Linq.Expressions;

namespace ISys.Application.Queries
{
    public static class RoomQueries
    {
        public static Expression<Func<ReservationViewModel, bool>> GetAvailabilityByRoom(ReservationViewModel reservationViewModel)
        {
            return x => (((x.RoomId == reservationViewModel.RoomId) && (x.DateInitial < reservationViewModel.DateInitial) && (x.DateFinal > reservationViewModel.DateFinal))
                      || ((x.RoomId == reservationViewModel.RoomId) && (reservationViewModel.DateInitial > x.DateInitial && reservationViewModel.DateInitial < x.DateFinal))
                      || ((x.RoomId == reservationViewModel.RoomId) && (reservationViewModel.DateFinal > x.DateInitial) && (reservationViewModel.DateInitial < x.DateFinal)));
        }

        public static Expression<Func<ReservationViewModel, bool>> GetAvailability(AvailabilityViewModel availabilityViewModel)
        {
            return x => (x.DateInitial < availabilityViewModel.DateInitial) & (x.DateFinal > availabilityViewModel.DateFinal);
        }
    }
}