using System;
using AutoMapper;
using ISys.Application.AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace ISys.Services.Api.Configurations
{
  public static class AutoMapperSetup
  {
      public static void AddAutoMapperSetup(this IServiceCollection services)
      {
          if (services == null) throw new ArgumentNullException(nameof(services));

          services.AddAutoMapper();

          AutoMapperConfig.RegisterMappings();
      }
  }
}