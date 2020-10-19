using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ISys.Infra.Data.Context;

namespace ISys.Infra.CrossCutting.Identity.Configurations
{
    public static class EventStoreConfig
    {
        public static IServiceCollection AddEventStoreConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EventStoreSQLContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            return services;
        }
    }
}