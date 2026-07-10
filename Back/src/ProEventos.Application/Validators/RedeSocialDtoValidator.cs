using FluentValidation;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Validators
{
    public class RedeSocialDtoValidator : AbstractValidator<RedeSocialDto>
    {
        public RedeSocialDtoValidator()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("Nome é obrigatório.");

            RuleFor(x => x.URL)
                .NotEmpty().WithMessage("URL é obrigatório.");
        }
    }
}