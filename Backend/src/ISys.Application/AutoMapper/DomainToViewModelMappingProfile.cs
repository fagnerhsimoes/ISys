using AutoMapper;
using ISys.Application.ViewModels;
using ISys.Domain.Models;

namespace ISys.Application.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<Room        , RoomViewModel>();
            CreateMap<Reservation , ReservationViewModel>();
        }
    }
}
