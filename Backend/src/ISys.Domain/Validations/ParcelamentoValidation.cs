using System;
using ISys.Domain.Commands;
using FluentValidation;

namespace ISys.Domain.Validations
{
    public abstract class ParcelamentoValidation<T> : AbstractValidator<T> where T : ParcelamentoCommand
    {
        protected void ValidateValorEntrada()
        {
            RuleFor(c => c.ValorEntrada)
                .NotEmpty().WithMessage("Por Favor, Informe o Valor de Entrada");
        }

        protected void ValidateValorTotal()
        {
            RuleFor(c => c.ValorTotal)
                .Must(valor => valor > 0).WithMessage("O Valor Total tem que ser maior que 0");
        }

        protected void ValidateMinimoParcela()
        {
            RuleFor(c => c.MinimoParcela)
                .Must(valor => valor >= 0).WithMessage("O Valor da Parcela tem que ser maior que 0");
        }

        protected void ValidateValorParcela()
        {
            RuleFor(c => c.ValorParcela)
                .Must(valor => valor > 0).WithMessage("O Valor da Parcela tem que ser maior que 0");
        }

        protected void ValidatePrimeiroVencimento()
        {
            RuleFor(c => c.PrimeiroVencimento)
                .Must(date => date > DateTime.Now).WithMessage("A Data do Primeiro Vencimento deve ser informada e não pode ser anterior a Data Atual");
        }

        protected void ValidateMaximoParcelas()
        {
            RuleFor(c => c.MaximoParcelas)
                .Must(valor => valor > 0).WithMessage("O Valor da Quantidade Máxima de Parcelas tem que ser maior que 0");
        }

        protected void ValidateQuantidadeParcela()
        {
            RuleFor(c => c.QuantidadeParcela)
                .Must(valor => valor > 0).WithMessage("O Valor da Quantidade de Parcelas tem que ser maior que 0");
        }

        protected void ValidateTipoIntervaloVencimento()
        {
            RuleFor(c => c.TipoIntervaloVencimento)
                .Must(tipo => tipo >= 0).WithMessage("Por Favor, Informe ao Tipo de Intervalo de Vencimento");
        }

        protected void ValidateIntervaloVencimento()
        {
            RuleFor(c => c.IntervaloVencimento)
                .Must(valor => valor > 0).WithMessage("O Valor de Intervalo de Vencimento tem que ser maior que 0");
        }

        protected void ValidateId()
        {
            RuleFor(c => c.Id)
                .NotEqual(Guid.Empty);
        }
    }
}