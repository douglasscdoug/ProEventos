using System;

namespace ProEventos.Application.Dtos;

public class PalestranteDto
{
   public int Id { get; set; }
   public required string Nome { get; set; }
   public string ? MiniCurriculo { get; set; }
   public string ? ImagemURL { get; set; }
   public required string Telefone { get; set; }
   public required string Email { get; set; }
   public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
   public IEnumerable<EventoDto> Eventos { get; set; }
}
