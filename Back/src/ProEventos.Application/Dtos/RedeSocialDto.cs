using System;
using System.Text.Json.Serialization;

namespace ProEventos.Application.Dtos;

public class RedeSocialDto
{
   public int Id { get; set; }
   public required string Nome { get; set; }
   public required string URL { get; set; }
   public int ? EventoId { get; set; }
   [JsonIgnore]
   public EventoDto ? Evento { get; set; }
   public int ? PalestranteId { get; set; }
   [JsonIgnore]
   public PalestranteDto ? Palestrante { get; set; }
}
