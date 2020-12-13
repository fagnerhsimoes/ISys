using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ISys.Domain.Models;

namespace ISys.Infra.Data.Mappings
{
    public class ReservationMap : IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder)
        {
            builder.ToTable("Reservation");
            builder.Property(x => x.Id).HasColumnName("Id");
            builder.Property(x => x.Title).IsRequired().HasMaxLength(100).HasColumnType("varchar(100)");
            builder.HasOne(x => x.Room).WithMany(x => x.Reservations);
        }
    }
}
