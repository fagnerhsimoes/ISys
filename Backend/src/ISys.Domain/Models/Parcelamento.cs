using System;
using System.Collections.Generic;
using ISys.Domain.Core.Models;

namespace ISys.Domain.Models
{
    public class Parcelamento : Entity
    {
        public Parcelamento(Guid id)
        {
            Id = id;
        }

        // Empty constructor for EF
        protected Parcelamento() { }

    }
}