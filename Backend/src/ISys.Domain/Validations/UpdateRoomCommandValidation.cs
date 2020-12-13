using ISys.Domain.Commands;

namespace ISys.Domain.Validations
{
    public class UpdateRoomCommandValidation : RoomValidation<UpdateRoomCommand>
    {
        public UpdateRoomCommandValidation()
        {
            ValidateDescription();
        }
    }
}