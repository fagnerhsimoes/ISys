using AutoMapper;
using ISys.Application.ViewModels;
using ISys.Domain.Commands;

namespace ISys.Application.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<RoomViewModel, RegisterNewRoomCommand>().ConstructUsing(c => new RegisterNewRoomCommand(c.Description));
            CreateMap<RoomViewModel, UpdateRoomCommand>().ConstructUsing(c => new UpdateRoomCommand(c.Id, c.Description));

            CreateMap<ReservationViewModel, RegisterNewReservationCommand>().ConstructUsing(c => new RegisterNewReservationCommand(c.Title, c.DateInitial, c.DateFinal, c.RoomId, c.Room));
            CreateMap<ReservationViewModel, UpdateReservationCommand>().ConstructUsing(c => new UpdateReservationCommand(c.Id, c.Title, c.DateInitial, c.DateFinal, c.RoomId, c.Room));
        }
    }
}
