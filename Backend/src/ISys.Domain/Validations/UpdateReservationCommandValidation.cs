using ISys.Domain.Commands;

namespace ISys.Domain.Validations
{
    public class UpdateReservationCommandValidation : ReservationValidation<UpdateReservationCommand>
    {
        public UpdateReservationCommandValidation()
        {
            ValidateTitle();
            ValidateDateInitial();
            ValidateDateFinal();
            ValidateRoomId();
        }
    }
}