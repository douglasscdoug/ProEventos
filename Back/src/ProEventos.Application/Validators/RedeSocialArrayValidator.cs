using FluentValidation;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Validators
{
    public class RedeSocialArrayValidator : AbstractValidator<RedeSocialDto[]>
    {
        public RedeSocialArrayValidator()
        {
            RuleForEach(redeSocial => redeSocial)
            .SetValidator(new RedeSocialDtoValidator());
        }
    }
}