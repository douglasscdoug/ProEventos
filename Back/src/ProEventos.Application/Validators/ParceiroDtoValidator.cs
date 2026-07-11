using FluentValidation;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Validators
{
    public class ParceiroDtoValidator : AbstractValidator<ParceiroDto>
    {
        public ParceiroDtoValidator()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("Nome é obrigatório");

            RuleFor(x => x.Categoria)
                .IsInEnum().WithMessage("Categoria inválida");

            RuleFor(x => x.Responsavel)
                .NotEmpty().WithMessage("Responsavel é obrigatório");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email é obrigatório")
                .EmailAddress().WithMessage("E-mail inválido");

            RuleFor(x => x.Telefone).TelefoneValido();
        }
    }
}