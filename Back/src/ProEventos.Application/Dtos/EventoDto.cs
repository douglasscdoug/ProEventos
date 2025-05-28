using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos;

public class EventoDto
{
   public int Id { get; set; }
   [
      Required(ErrorMessage = "O campo {0} é obrigatório."),
      StringLength(50, MinimumLength = 3, ErrorMessage = "O Campo {0} deve conter no mínimo 3 e no máximo 50 caracteres.")
   ]
   public string Tema { get; set; }

   [Required(ErrorMessage = "O Campo {0} é obrigatório.")]
   public required string Local { get; set; }
   public DateTime ? DataEvento { get; set; }

   [
      Display(Name = "Qtd Pessoas"),
      Required(ErrorMessage = "O Campo {0} é obrigatório."),
      Range(1, 120000, ErrorMessage = "{0} Deve estar entre 1 e 120.000")
   ]
   public int QtdPessoas { get; set; }

   [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "Tipo de imagem inválida. (bmp, gig, jpeg, jpg ou png)")]
   public string? ImagemUrl { get; set; }

   [
      Required(ErrorMessage = "O Campo {0} é obrigatório."),
      Phone(ErrorMessage = "{0} inválido")
   ]
   public string? Telefone { get; set; }

   [
      Display(Name = "E-mail"),
      Required(ErrorMessage = "O Campo {0} é obrigatório."),
      EmailAddress(ErrorMessage = "{0} inválido")
   ]
   public string? Email { get; set; }
   public int ? UserId { get; set; }
   public UserDto ? UserDto { get; set; }
   public IEnumerable<LoteDto> ? Lotes { get; set; }
   public IEnumerable<RedeSocialDto> ? RedesSociais { get; set; }
   public List<PalestranteDto> Palestrantes { get; set; } = [];
}
