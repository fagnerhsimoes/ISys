using System;
using System.Collections.Generic;
using System.Linq;
using ISys.Domain.Interfaces;
using ISys.Domain.Models;
using ISys.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace ISys.Infra.Data.Repository
{
    public class ReservationRepository : Repository<Reservation>, IReservationRepository
    {
        public ReservationRepository(StoreDbContext context) : base(context)
        {

        }

        public Reservation GetByTitle(string title)
        {
            return DbSet.AsNoTracking().FirstOrDefault(c => c.Title == title);
        }
    }
}
