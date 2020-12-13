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
    public class RoomController : BaseController
    {
        private readonly IRoomAppService _RoomAppService;

        public RoomController(IRoomAppService RoomAppService, 
                                  INotificationHandler<DomainNotification> notifications) : base(notifications)
        {
            _RoomAppService = RoomAppService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Room-management/list-all")]
        public IActionResult Index()
        {
            return View(_RoomAppService.GetAll());
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Room-management/Room-details/{id:guid}")]
        public IActionResult Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var RoomViewModel = _RoomAppService.GetById(id.Value);

            if (RoomViewModel == null)
            {
                return NotFound();
            }

            return View(RoomViewModel);
        }

        [HttpGet]
        [Authorize(Policy = "CanWriteRoomData")]
        [Route("Room-management/register-new")]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Policy = "CanWriteRoomData")]
        [Route("Room-management/register-new")]
        [ValidateAntiForgeryToken]
        public IActionResult Create(RoomViewModel RoomViewModel)
        {
            if (!ModelState.IsValid) return View(RoomViewModel);
            _RoomAppService.Register(RoomViewModel);

            if (IsValidOperation())
                ViewBag.Sucesso = "Room Registered!";

            return View(RoomViewModel);
        }
        
        [HttpGet]
        [Authorize(Policy = "CanWriteRoomData")]
        [Route("Room-management/edit-Room/{id:guid}")]
        public IActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var RoomViewModel = _RoomAppService.GetById(id.Value);

            if (RoomViewModel == null)
            {
                return NotFound();
            }

            return View(RoomViewModel);
        }

        [HttpPost]
        [Authorize(Policy = "CanWriteRoomData")]
        [Route("Room-management/edit-Room/{id:guid}")]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(RoomViewModel RoomViewModel)
        {
            if (!ModelState.IsValid) return View(RoomViewModel);

            _RoomAppService.Update(RoomViewModel);

            if (IsValidOperation())
                ViewBag.Sucesso = "Room Updated!";

            return View(RoomViewModel);
        }

        [HttpGet]
        [Authorize(Policy = "CanRemoveRoomData")]
        [Route("Room-management/remove-Room/{id:guid}")]
        public IActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var RoomViewModel = _RoomAppService.GetById(id.Value);

            if (RoomViewModel == null)
            {
                return NotFound();
            }

            return View(RoomViewModel);
        }

        [HttpPost, ActionName("Delete")]
        [Authorize(Policy = "CanRemoveRoomData")]
        [Route("Room-management/remove-Room/{id:guid}")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(Guid id)
        {
            _RoomAppService.Remove(id);

            if (!IsValidOperation()) return View(_RoomAppService.GetById(id));

            ViewBag.Sucesso = "Room Removed!";
            return RedirectToAction("Index");
        }

        [AllowAnonymous]
        [Route("Room-management/Room-history/{id:guid}")]
        public JsonResult History(Guid id)
        {
            var RoomHistoryData = _RoomAppService.GetAllHistory(id);
            return Json(RoomHistoryData);
        }
    }
}
