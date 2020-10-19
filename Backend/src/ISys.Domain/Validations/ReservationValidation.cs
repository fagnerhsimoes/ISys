using System;
using ISys.Domain.Commands;
using FluentValidation;

namespace ISys.Domain.Validations
{
    public abstract class ReservationValidation<T> : AbstractValidator<T> where T : ReservationCommand
    {
        protected void ValidateTitle()
        {
            RuleFor(c => c.Title)
                .NotEmpty().WithMessage("Please ensure you have entered the Title")
                .Length(3, 150).WithMessage("The Title must have between 3 and 100 characters");
        }


        protected void ValidateDateInitial()
        {
            RuleFor(c => c.DateInitial)
                .NotEmpty().WithMessage("Please ensure you have entered the Data Inicial");
        }

        protected void ValidateDateFinal()
        {
            RuleFor(c => c.DateFinal)
                .NotEmpty().WithMessage("Please ensure you have entered the Data Final");
        }


        protected void ValidateId()
        {
            RuleFor(c => c.Id)
                .NotEqual(Guid.Empty);
        }

        protected void ValidateRoomId()
        {
            RuleFor(c => c.RoomId)
                .NotEqual(Guid.Empty);
        }

    }
}