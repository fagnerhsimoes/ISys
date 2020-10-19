using System;
using System.Linq;
using ISys.Application.Interfaces;
using ISys.Application.ViewModels;
using ISys.Domain.Core.Bus;
using ISys.Domain.Core.Notifications;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ISys.Services.Api.Controllers
{
    [Authorize]
    [Route("api")]
    public class RoomController : ApiController
    {
        private readonly IRoomAppService        _RoomAppService;
        private readonly IReservationAppService _ReservationAppService;

        public RoomController(
            IRoomAppService RoomAppService,
            IReservationAppService ReservationAppService,
            INotificationHandler<DomainNotification> notifications,
            IMediatorHandler mediator) : base(notifications, mediator)
        {
            _RoomAppService        = RoomAppService;
            _ReservationAppService = ReservationAppService;
        }

        [AllowAnonymous]
        [HttpGet("v1/room")]
        public IActionResult Get()
        {
            return Response(_RoomAppService.GetAll());
        }

        [AllowAnonymous]
        [HttpGet("v1/room/{id:guid}")]
        public IActionResult Get(Guid id)
        {
            var RoomViewModel = _RoomAppService.GetById(id);

            return Response(RoomViewModel);
        }

        [Authorize(Policy = "CanWriteRoomData")]
        [HttpPost("v1/room")]
        public IActionResult Post([FromBody] RoomViewModel RoomViewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(RoomViewModel);
            }

            _RoomAppService.Register(RoomViewModel);

            return Response(RoomViewModel);
        }

        [Authorize(Policy = "CanWriteRoomData")]
        [HttpPut("v1/room/{id:guid}")]
        public IActionResult Put([FromBody] RoomViewModel RoomViewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(RoomViewModel);
            }

            _RoomAppService.Update(RoomViewModel);

            return Response(RoomViewModel);
        }

        //[Authorize(Policy = "CanRemoveRoomData")]
        [HttpDelete("v1/room/{id:guid}")]
        public IActionResult Delete(Guid id)
        {

            var reservation =  _ReservationAppService.GetAllByRoom(id);
            int numberreservations = reservation.Count();
            if (numberreservations > 0)
            {
                return BadRequest("Existe Reserva Agendada para esta Sala. Não será possível excluir a Sala.");
            }

            _RoomAppService.Remove(id);

            return Response();
        }

        [AllowAnonymous]
        [HttpGet("v1/room/history/{id:guid}")]
        public IActionResult History(Guid id)
        {
            var RoomHistoryData = _RoomAppService.GetAllHistory(id);
            return Response(RoomHistoryData);
        }
    }
}
