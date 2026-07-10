using FluentValidation;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Validators
{
    public class LoteDtoValidator : AbstractValidator<LoteDto>
    {
        public LoteDtoValidator()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("Nome é obrigatório.");

            RuleFor(x => x.Preco)
                .NotEmpty().WithMessage("Preço é obrigatório.");

            RuleFor(x => x.Quantidade)
                .NotEmpty().WithMessage("Quantidade é obrigatório.");
        }
    }
}