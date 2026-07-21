using ProEventos.Domain.Enum;

namespace ProEventos.Application.Dtos
{
    public class UserDetailsDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string UserName { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Funcao Funcao { get; set; }
        public string ? Descricao { get; set; }
        public string ? Password { get; set; }
        public string ? ImagemUrl { get; set; }
        public int TotalEventosCriados { get; set; }
        public int TotalEventosComoPalestrante { get; set; }
        public int TotalEventosComoParticipante { get; set; }
    }
}