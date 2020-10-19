using ISys.Domain.Commands;

namespace ISys.Domain.Validations
{
    public class RemoveReservationCommandValidation : ReservationValidation<RemoveReservationCommand>
    {
        public RemoveReservationCommandValidation()
        {
            ValidateId();
        }
    }
}