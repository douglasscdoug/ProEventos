namespace ProEventos.Domain;

public class Palestrante
{
   public int Id { get; set; }
   public required string Nome { get; set; }
   public string ? MiniCurriculo { get; set; }
   public string ? ImagemURL { get; set; }
   public required string Telefone { get; set; }
   public required string Email { get; set; }
   public IEnumerable<RedeSocial> RedesSociais { get; set; }
   public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; }
}
