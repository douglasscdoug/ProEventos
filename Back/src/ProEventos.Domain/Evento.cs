namespace ProEventos.Domain;

public class Evento
{
   public int Id { get; set; }
   public required string Tema { get; set; }
   public required string Local { get; set; }
   public DateTime ? DataEvento { get; set; }
   public int QtdPessoas { get; set; }
   public string ? ImagemUrl { get; set; }
   public string ? Telefone { get; set; }
   public string ? Email { get; set; }
   public IEnumerable<Lote> Lotes { get; set; }
   public IEnumerable<RedeSocial> RedesSociais { get; set; }
   public IEnumerable<PalestranteEvento> ? PalestrantesEventos { get; set; }
}