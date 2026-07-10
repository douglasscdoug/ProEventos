using FluentValidation;
using ProEventos.Application.Common.Utils;

namespace ProEventos.Application.Validators
{
    public static class TelefoneValidator
    {
        public static IRuleBuilderOptions<T, string> TelefoneValido<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder
                .NotEmpty().WithMessage("Telefone é obrigatório.")
                .Must(tel =>
                {
                    var limpo = StringUtils.SomenteNumeros(tel);
                    return !string.IsNullOrEmpty(limpo) && (limpo.Length == 10 || limpo.Length == 11);
                })
                .WithMessage("Telefone inválido");
        }
    }
}