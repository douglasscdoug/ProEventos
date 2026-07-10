using FluentValidation;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Validators
{
    public class UserUpdateDtoValidator : AbstractValidator<UserUpdateDto>
    {
        public UserUpdateDtoValidator()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("O campo nome é obrigatório.");

            RuleFor(x => x.Sobrenome)
                .NotEmpty().WithMessage("O campo sobrenome é obrigatório.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("O campo email é obrigatório.")
                .EmailAddress().WithMessage("E-mail inválido");

            RuleFor(x => x.PhoneNumber).TelefoneValido();

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("A senha não pode ser vazia.")
                .MinimumLength(6)
                .WithMessage("A senha deve ter no mínimo 6 caracteres.")
                .When(x => x.Password != null);
        }
    }
}