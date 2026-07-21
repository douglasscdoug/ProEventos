using ProEventos.Application.Common.Utils;
using ProEventos.Application.Dtos;
using ProEventos.Application.Filters;
using ProEventos.Persistence.Models;

namespace ProEventos.Application.Contratos;

public interface IPalestranteService
{
    Task<PalestranteDto> AddPalestrante(int userId, PalestranteAddDto model);
    Task<PalestranteDto?> UpdatePalestrante(int userId, PalestranteUpdateDto model);
    
    //refatorados
    // Task<PageList<PalestranteDto>?> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false);
    Task<PagedResult<PalestranteDetailsDto>> FiltrarAsync(PalestranteFiltroDto filtro);
    Task<PalestranteDto?> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false);
}
