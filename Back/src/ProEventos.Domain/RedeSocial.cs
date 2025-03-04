using System.Text.Json.Serialization;

namespace ProEventos.Domain;

public class RedeSocial
{
   public int Id { get; set; }
   public required string Nome { get; set; }
   public required string URL { get; set; }
   public int ? EventoId { get; set; }
   [JsonIgnore]
   public Evento ? Evento { get; set; }
   public int ? PalestranteId { get; set; }
   public Palestrante ? Palestrante { get; set; }
}
