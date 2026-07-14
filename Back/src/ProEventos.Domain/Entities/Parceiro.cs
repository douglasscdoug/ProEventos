using ProEventos.Domain.Enum;
using ProEventos.Domain.Identity;

namespace ProEventos.Domain.Entities
{
    public class Parceiro
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public Categoria Categoria { get; set; }
        public required string Responsavel { get; set; }
        public required string Email { get; set; }
        public required string Telefone { get; set; }
        public string? Site { get; set; }
        public string? ImagemUrl { get; set; }
        public string? ImagemPublicId { get; set; }
        public string? Observacao { get; set; }
        public bool Ativo { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}