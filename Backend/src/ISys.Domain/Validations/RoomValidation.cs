using System;
using ISys.Domain.Commands;
using FluentValidation;

namespace ISys.Domain.Validations
{
    public abstract class RoomValidation<T> : AbstractValidator<T> where T : RoomCommand
    {
        protected void ValidateDescription()
        {
            RuleFor(c => c.Description)
                .NotEmpty().WithMessage("Por Favor, Informe e Descrição")
                .Length(3, 100).WithMessage("A descrição deve ter entre 3 e 150 caracteres");
        }


        protected void ValidateId()
        {
            RuleFor(c => c.Id)
                .NotEqual(Guid.Empty);
        }

    }
}