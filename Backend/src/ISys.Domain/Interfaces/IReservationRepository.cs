using ISys.Domain.Models;
using System;
using System.Collections.Generic;

namespace ISys.Domain.Interfaces
{
    public interface IReservationRepository : IRepository<Reservation>
    {
        Reservation GetByTitle(string title);
    }
}