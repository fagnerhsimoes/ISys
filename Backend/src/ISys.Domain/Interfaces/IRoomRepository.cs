using ISys.Domain.Models;
using System;
using System.Collections.Generic;

namespace ISys.Domain.Interfaces
{
    public interface IRoomRepository : IRepository<Room>
    {
        Room GetByDescription(string description);

    }
}