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
    public class ReservationController : ApiController
    {
        private readonly IReservationAppService _ReservationAppService;

        public ReservationController(
            IReservationAppService ReservationAppService,
            INotificationHandler<DomainNotification> notifications,
            IMediatorHandler mediator) : base(notifications, mediator)
        {
            _ReservationAppService = ReservationAppService;
        }

        [AllowAnonymous]
        [HttpGet("v1/reservation")]
        public IActionResult Get()
        {
            return Response(_ReservationAppService.GetAll());
        }

        [AllowAnonymous]
        [HttpGet("v1/reservation/room/{id:guid}")]
        public IActionResult GetReservations(Guid id)
        {
            return Response(_ReservationAppService.GetAllByRoom(id));
        }

        [AllowAnonymous]
        [HttpGet("v1/reservation/{id:guid}")]
        public IActionResult Get(Guid id)
        {
            var ReservationViewModel = _ReservationAppService.GetById(id);

            return Response(ReservationViewModel);
        }

        [AllowAnonymous]
        [HttpPost("v1/reservation")]
        public IActionResult Post([FromBody] ReservationViewModel ReservationViewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(ReservationViewModel);
            }

            var roomIsReservation = _ReservationAppService.GetRoomAvailability(ReservationViewModel);
            ReservationViewModel _reservationViewModel = roomIsReservation.FirstOrDefault();
            if (roomIsReservation.Count() > 0)
            {
                DateTime horaInicial;
                DateTime horaFinal;
                if (_reservationViewModel.DateInitial > ReservationViewModel.DateInitial)
                    horaInicial = _reservationViewModel.DateInitial;
                else horaInicial = ReservationViewModel.DateInitial;
                if (_reservationViewModel.DateFinal < ReservationViewModel.DateFinal)
                    horaFinal = _reservationViewModel.DateFinal;
                else horaFinal = ReservationViewModel.DateFinal;

                return BadRequest("Não foi possivel realizar a reserva! Já existe a reserva para esta sala de Título: " + _reservationViewModel.Title + " no período de " + horaInicial + " até as " + horaFinal + ".");
            }

            _ReservationAppService.Register(ReservationViewModel);

            return Response(ReservationViewModel);
        }

        [Authorize(Policy = "CanWriteReservationData")]
        [HttpPut("v1/reservation/{id:guid}")]
        public IActionResult Put([FromBody] ReservationViewModel ReservationViewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(ReservationViewModel);
            }

            _ReservationAppService.Update(ReservationViewModel);

            return Response(ReservationViewModel);
        }

        //[Authorize(Policy = "CanRemoveReservationData")]
        [HttpDelete("v1/reservation/{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            _ReservationAppService.Remove(id);

            return Response();
        }

        [AllowAnonymous]
        [HttpGet("v1/reservation/history/{id:guid}")]
        public IActionResult History(Guid id)
        {
            var ReservationHistoryData = _ReservationAppService.GetAllHistory(id);
            return Response(ReservationHistoryData);
        }
    }
}
