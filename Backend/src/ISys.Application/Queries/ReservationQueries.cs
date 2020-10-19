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

        public static Expression<Func<ReservationViewModel, bool>>CheckAvailability(Guid roomId, DateTime dateInitial, DateTime dateFinal)
        {
            return x => (x.RoomId == roomId) &  (x.DateInitial <= dateInitial) & (x.DateFinal <= dateFinal);
        }
    }
}