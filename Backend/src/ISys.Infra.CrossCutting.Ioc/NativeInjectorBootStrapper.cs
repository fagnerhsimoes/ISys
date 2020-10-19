using ISys.Application.Interfaces;
using ISys.Application.Services;
using ISys.Domain.CommandHandlers;
using ISys.Domain.Commands;
using ISys.Domain.Core.Bus;
using ISys.Domain.Core.Events;
using ISys.Domain.Core.Notifications;
using ISys.Domain.EventHandlers;
using ISys.Domain.Events;
using ISys.Domain.Interfaces;
using ISys.Infra.CrossCutting.Bus;
using ISys.Infra.CrossCutting.Identity.Authorization;
using ISys.Infra.CrossCutting.Identity.Models;
using ISys.Infra.CrossCutting.Identity.Services;
using ISys.Infra.Data.Context;
using ISys.Infra.Data.EventSourcing;
using ISys.Infra.Data.Repository;
using ISys.Infra.Data.Repository.EventSourcing;
using ISys.Infra.Data.UoW;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace ISys.Infra.CrossCutting.IoC
{
    public class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services)
        {
            // ASP.NET HttpContext dependency
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Domain Bus (Mediator)
            services.AddScoped<IMediatorHandler, InMemoryBus>();

            // ASP.NET Authorization Polices
            services.AddSingleton<IAuthorizationHandler, ClaimsRequirementHandler>();

            // Application
            services.AddScoped<IRoomAppService        , RoomAppService>();
            services.AddScoped<IReservationAppService , ReservationAppService>();

            // Domain - Events
            services.AddScoped<INotificationHandler<DomainNotification>  , DomainNotificationHandler>();
            services.AddScoped<INotificationHandler<RoomRegisteredEvent> , RoomEventHandler>();
            services.AddScoped<INotificationHandler<RoomUpdatedEvent>    , RoomEventHandler>();
            services.AddScoped<INotificationHandler<RoomRemovedEvent>    , RoomEventHandler>();

            services.AddScoped<INotificationHandler<ReservationRegisteredEvent>, ReservationEventHandler>();
            services.AddScoped<INotificationHandler<ReservationUpdatedEvent>   , ReservationEventHandler>();
            services.AddScoped<INotificationHandler<ReservationRemovedEvent>   , ReservationEventHandler>();

            // Domain - Commands
            services.AddScoped<IRequestHandler<RegisterNewRoomCommand, bool>, RoomCommandHandler>();
            services.AddScoped<IRequestHandler<UpdateRoomCommand     , bool>, RoomCommandHandler>();
            services.AddScoped<IRequestHandler<RemoveRoomCommand     , bool>, RoomCommandHandler>();

            services.AddScoped<IRequestHandler<RegisterNewReservationCommand, bool>, ReservationCommandHandler>();
            services.AddScoped<IRequestHandler<UpdateReservationCommand     , bool>, ReservationCommandHandler>();
            services.AddScoped<IRequestHandler<RemoveReservationCommand     , bool>, ReservationCommandHandler>();

            // Infra - Data
            services.AddScoped<IRoomRepository        , RoomRepository>();
            services.AddScoped<IReservationRepository , ReservationRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<StoreDbContext>();


            // Infra - Data EventSourcing
            services.AddScoped<IEventStoreRepository, EventStoreSQLRepository>();
            services.AddScoped<IEventStore, SqlEventStore>();
            services.AddScoped<EventStoreSQLContext>();

            // Infra - Identity Services
            services.AddTransient<IEmailSender, AuthEmailMessageSender>();
            services.AddTransient<ISmsSender, AuthSMSMessageSender>();

            // Infra - Identity
            services.AddScoped<IUser, AspNetUser>();
        }
    }
}