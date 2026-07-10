using FluentValidation;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Validators
{
    public class UserDtoValidator : AbstractValidator<UserDto>
    {
        public UserDtoValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("UserName é obrigatório.");

            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("Nome é obrigatório.");

            RuleFor(x => x.Sobrenome)
                .NotEmpty().WithMessage("Sobrenome é obrigatório.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("E-mail é obrigatório.")
                .EmailAddress().WithMessage("E-mail inválido");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Senha é obrigatório.")
                .MinimumLength(6).WithMessage("A senha deve ter no mínimo 6 caracteres.");
        }
    }
}