using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos;

public class EventoDto
{
   public int Id { get; set; }
   public string Tema { get; set; }
   public required string Local { get; set; }
   public DateTime ? DataEvento { get; set; }
   public int QtdPessoas { get; set; }
   public string? ImagemUrl { get; set; }
   public string Telefone { get; set; }
   public string Email { get; set; }
   public int ? UserId { get; set; }
   public UserDto ? UserDto { get; set; }
   public IEnumerable<LoteDto> ? Lotes { get; set; }
   public IEnumerable<RedeSocialDto> ? RedesSociais { get; set; }
   public List<PalestranteDto> Palestrantes { get; set; } = [];
}
