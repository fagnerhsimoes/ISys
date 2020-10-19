using ISys.Domain.Commands;

namespace ISys.Domain.Validations
{
    public class RegisterNewReservationCommandValidation : ReservationValidation<RegisterNewReservationCommand>
    {
        public RegisterNewReservationCommandValidation()
        {
            ValidateTitle();
            ValidateDateInitial();
            ValidateDateFinal();
            ValidateRoomId();
        }
    }
}