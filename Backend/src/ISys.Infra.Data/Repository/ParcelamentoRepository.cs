using System.Linq;
using ISys.Domain.Interfaces;
using ISys.Domain.Models;
using ISys.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace ISys.Infra.Data.Repository
{
    public class ParcelamentoRepository : Repository<Parcelamento>, IParcelamentoRepository
    {
        public ParcelamentoRepository(StoreDbContext context): base(context)
        {

        }

        /*public Room GetByDescription(string description)
        {
            return DbSet.AsNoTracking().FirstOrDefault(c => c.Description == description);
        }*/
    }
}
