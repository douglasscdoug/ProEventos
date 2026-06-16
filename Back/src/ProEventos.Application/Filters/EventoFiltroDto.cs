using ProEventos.Application.Common.Utils;

namespace ProEventos.Application.Filters;

public class EventoFiltroDto : PagedRequest
{
    public string? Tema { get; set; }
    public string? Local { get; set; }
    public DateTime? DataEvento { get; set; }
    public int? QtdPessoas { get; set; }
}