using FluentValidation;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Validators
{
    public class LoteArrayValidator : AbstractValidator<LoteDto[]>
    {
        public LoteArrayValidator()
        {
            RuleForEach(lote => lote)
            .SetValidator(new LoteDtoValidator());
        }
    }
}