namespace ProEventos.Application.Dtos
{
    public class PalestranteDetailsDto
    {
        public int Id { get; set; }
        public string? MiniCurriculo { get; set; }
        public bool Ativo { get; set; }
        public int UserId { get; set; }
        public UserDetailsDto? User { get; set; }
        public IEnumerable<RedeSocialDto>? RedesSociais { get; set; }
    }
}