using FluentValidation;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Validators
{
    public class PalestranteDtoValidator : AbstractValidator<PalestranteDto>
    {
        public PalestranteDtoValidator()
        {
            RuleForEach(x => x.RedesSociais)
                .SetValidator(new RedeSocialDtoValidator())
                .When(x => x.RedesSociais?.Any() == true);
        }
    }
}