using ISys.Domain.Commands;

namespace ISys.Domain.Validations
{
    public class RemoveRoomCommandValidation : RoomValidation<RemoveRoomCommand>
    {
        public RemoveRoomCommandValidation()
        {
            ValidateId();
        }
    }
}