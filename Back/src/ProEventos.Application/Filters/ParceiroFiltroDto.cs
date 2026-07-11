using ProEventos.Application.Common.Utils;
using ProEventos.Domain.Enum;

namespace ProEventos.Application.Filters
{
    public class ParceiroFiltroDto : PagedRequest
    {
        public int? Id { get; set; }
        public string? Nome { get; set; }
        public Categoria? Categoria { get; set; }
        public string? Responsavel { get; set; }
        public bool? Ativo { get; set; }
    }
}