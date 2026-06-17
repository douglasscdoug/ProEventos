using ProEventos.Application.Common.Utils;
using ProEventos.Application.Dtos;
using ProEventos.Application.Filters;
using ProEventos.Persistence.Models;

namespace ProEventos.Application.Contratos;

public interface IPalestranteService
{
    Task<PalestranteDto?> AddPalestrante(int userId, PalestranteAddDto model);
    Task<PalestranteDto?> UpdatePalestrante(int userId, PalestranteUpdateDto model);
    Task<PalestranteDto?> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false);
    //refatorados
    // Task<PageList<PalestranteDto>?> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false);
    Task<PagedResult<PalestranteDto>> FiltrarAsync(PalestranteFiltroDto filtro);
}
