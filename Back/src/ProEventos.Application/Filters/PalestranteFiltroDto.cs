using ProEventos.Application.Common.Utils;

namespace ProEventos.Application.Filters;

public class PalestranteFiltroDto : PagedRequest
{
    public string? Nome { get; set; }
    public string? Sobrenome { get; set; }
    public string? Email { get; set; }
    public string? MiniCurriculo { get; set; }
}