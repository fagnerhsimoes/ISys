using System;
using ISys.Application.Interfaces;
using ISys.Application.ViewModels;
using ISys.Domain.Core.Notifications;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ISys.UI.Web.Controllers
{
    [Authorize]
    public class ReservationController : BaseController
    {
        private readonly IReservationAppService _ReservationAppService;

        public ReservationController(IReservationAppService ReservationAppService,
                                  INotificationHandler<DomainNotification> notifications) : base(notifications)
        {
            _ReservationAppService = ReservationAppService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Reservation-management/list-all")]
        public IActionResult Index()
        {
            return View(_ReservationAppService.GetAll());
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Reservation-management/Reservation-details/{id:guid}")]
        public IActionResult Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ReservationViewModel = _ReservationAppService.GetById(id.Value);

            if (ReservationViewModel == null)
            {
                return NotFound();
            }

            return View(ReservationViewModel);
        }

        [HttpGet]
        [Authorize(Policy = "CanWriteReservationData")]
        [Route("Reservation-management/register-new")]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Policy = "CanWriteReservationData")]
        [Route("Reservation-management/register-new")]
        [ValidateAntiForgeryToken]
        public IActionResult Create(ReservationViewModel ReservationViewModel)
        {
            if (!ModelState.IsValid) return View(ReservationViewModel);
            _ReservationAppService.Register(ReservationViewModel);

            if (IsValidOperation())
                ViewBag.Sucesso = "Reservation Registered!";

            return View(ReservationViewModel);
        }

        [HttpGet]
        [Authorize(Policy = "CanWriteReservationData")]
        [Route("Reservation-management/edit-Reservation/{id:guid}")]
        public IActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ReservationViewModel = _ReservationAppService.GetById(id.Value);

            if (ReservationViewModel == null)
            {
                return NotFound();
            }

            return View(ReservationViewModel);
        }

        [HttpPost]
        [Authorize(Policy = "CanWriteReservationData")]
        [Route("Reservation-management/edit-Reservation/{id:guid}")]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(ReservationViewModel ReservationViewModel)
        {
            if (!ModelState.IsValid) return View(ReservationViewModel);

            _ReservationAppService.Update(ReservationViewModel);

            if (IsValidOperation())
                ViewBag.Sucesso = "Reservation Updated!";

            return View(ReservationViewModel);
        }

        [HttpGet]
        [Authorize(Policy = "CanRemoveReservationData")]
        [Route("Reservation-management/remove-Reservation/{id:guid}")]
        public IActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ReservationViewModel = _ReservationAppService.GetById(id.Value);

            if (ReservationViewModel == null)
            {
                return NotFound();
            }

            return View(ReservationViewModel);
        }

        [HttpPost, ActionName("Delete")]
        [Authorize(Policy = "CanRemoveReservationData")]
        [Route("Reservation-management/remove-Reservation/{id:guid}")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(Guid id)
        {
            _ReservationAppService.Remove(id);

            if (!IsValidOperation()) return View(_ReservationAppService.GetById(id));

            ViewBag.Sucesso = "Reservation Removed!";
            return RedirectToAction("Index");
        }

        [AllowAnonymous]
        [Route("Reservation-management/Reservation-history/{id:guid}")]
        public JsonResult History(Guid id)
        {
            var ReservationHistoryData = _ReservationAppService.GetAllHistory(id);
            return Json(ReservationHistoryData);
        }
    }
}
