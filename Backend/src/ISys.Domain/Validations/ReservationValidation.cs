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
                .NotEmpty().WithMessage("Por Favor, Informe o Título")
                .Length(3, 100).WithMessage("O Título deve ter entre 3 e 100 Caracteres");
        }


        protected void ValidateDateInitial()
        {
            RuleFor(c => c.DateInitial)
                .NotEmpty().WithMessage("Por Favor, Informe a Data e Hora Inicial");
        }

        protected void ValidateDateFinal()
        {
            RuleFor(c => c.DateFinal)
                .NotEmpty().WithMessage("Por Favor, Informe a Data e Hora Final");
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