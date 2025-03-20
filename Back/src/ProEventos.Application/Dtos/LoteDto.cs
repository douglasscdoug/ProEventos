using System.Text.Json.Serialization;

namespace ProEventos.Application.Dtos;

public class LoteDto
{
    public int Id { get; set; }
   public required string Nome { get; set; }
   public decimal Preco { get; set; }
   public DateTime ? DataInicio { get; set; }
   public DateTime ? DataFim { get; set; }
   public int Quantidade { get; set; }
   public int EventoId { get; set; }

   [JsonIgnore]
   public EventoDto ? Evento { get; set; } = null!;
}
