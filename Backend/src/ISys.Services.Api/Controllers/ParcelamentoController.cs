using System;
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
    public class ParcelamentoController : ApiController
    {
        private readonly IParcelamentoAppService _ParcelamentoAppService;

        public ParcelamentoController(
            IParcelamentoAppService ParcelamentoAppService,
            INotificationHandler<DomainNotification> notifications,
            IMediatorHandler mediator) : base(notifications, mediator)
        {
            _ParcelamentoAppService = ParcelamentoAppService;
        }

        [AllowAnonymous]
        [HttpGet("v1/parcelamento")]
        public IActionResult Get()
        {
            return Response(_ParcelamentoAppService.GetAll());
        }

        [AllowAnonymous]
        [HttpGet("v1/parcelamento/{id:guid}")]
        public IActionResult Get(Guid id)
        {
            var ParcelamentoViewModel = _ParcelamentoAppService.GetById(id);
            return Response(ParcelamentoViewModel);
        }

        [Authorize(Policy = "CanWriteParcelamentoData")]
        [HttpPost("v1/parcelamento")]
        public IActionResult Post([FromBody] ParcelamentoViewModel ParcelamentoViewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(ParcelamentoViewModel);
            }

            _ParcelamentoAppService.Register(ParcelamentoViewModel);
            return Response(ParcelamentoViewModel);
        }

        [AllowAnonymous]
        [HttpPost("v1/parcelamento/opcoes")]
        public IActionResult GetOpcoes([FromBody] ParcelamentoOpcoesViewModel ParcelamentoOpcoesViewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(ParcelamentoOpcoesViewModel);
            }
            return Response(_ParcelamentoAppService.GetOpcoes(ParcelamentoOpcoesViewModel));
        }

        [AllowAnonymous]
        [HttpPost("v1/parcelamento/parcelas")]
        public IActionResult GetParcelas([FromBody] ParcelamentoParcelasViewModel ParcelamentoParcelasViewModel)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response(ParcelamentoParcelasViewModel);
            }
            return Response(_ParcelamentoAppService.GetParcelas(ParcelamentoParcelasViewModel));
        }


        [AllowAnonymous]
        [HttpGet("v1/parcelamento/history/{id:guid}")]
        public IActionResult History(Guid id)
        {
            var ParcelamentoHistoryData = _ParcelamentoAppService.GetAllHistory(id);
            return Response(ParcelamentoHistoryData);
        }
    }
}
