using System;
using FluentValidation;
using ProEventos.Application.Common.Utils;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Validators
{
    public class EventoDtoValidator : AbstractValidator<EventoDto>
    {
        public EventoDtoValidator()
        {
            RuleFor(x => x.Tema)
                .NotEmpty().WithMessage("Tema é obrigatório.");

            RuleFor(x => x.Local)
                .NotEmpty().WithMessage("Local é obrigatório.");

            RuleFor(x => x.DataEvento)
                .NotEmpty()
                .WithMessage("Data do evento é obrigatório.")
                .Must(data => data >= DateTime.UtcNow)
                .WithMessage("A data do evento não pode ser anterior a data atual.");

            RuleFor(x => x.QtdPessoas)
                .NotEmpty()
                .WithMessage("Quantidade de pessoas é obrigatório.")
                .InclusiveBetween(1, 120000)
                .WithMessage("Quantidade de pessoas deve estar entre 1 e 120.000");

            RuleFor(x => x.ImagemUrl)
                .Must(url =>
                    string.IsNullOrWhiteSpace(url) ||
                    new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp" }
                    .Contains(Path.GetExtension(url).ToLowerInvariant()))
                .WithMessage("Tipo de imagem inválida. Permitidos: bmp, gif, jpeg, jpg ou png.");

            RuleFor(x => x.Telefone).TelefoneValido();

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("E-mail é obrigatório.")
                .EmailAddress().WithMessage("E-mail inválido");

            RuleForEach(x => x.Lotes)
                .SetValidator(new LoteDtoValidator())
                .When(x => x.Lotes?.Any() == true);

            RuleForEach(x => x.RedesSociais)
                .SetValidator(new RedeSocialDtoValidator())
                .When(x => x.RedesSociais?.Any() == true);

            RuleForEach(x => x.Palestrantes)
                .SetValidator(new PalestranteDtoValidator())
                .When(x => x.Palestrantes?.Any() == true);
        }
    }
}