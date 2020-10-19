using ISys.Domain.Commands;

namespace ISys.Domain.Validations
{
    public class RegisterNewRoomCommandValidation : RoomValidation<RegisterNewRoomCommand>
    {
        public RegisterNewRoomCommandValidation()
        {
            ValidateDescription();
        }
    }
}