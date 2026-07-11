using ProEventos.Application.Common.Utils;
using ProEventos.Application.Dtos;
using ProEventos.Application.Filters;

namespace ProEventos.Application.Contratos
{
    public interface IParceiroService
    {
        Task<PagedResult<ParceiroDto>> Filtrar(int userId, ParceiroFiltroDto filtro);
        Task<ParceiroDto?> GetByIdAsync(int userId, int parceiroId);
        Task<ParceiroDto> AddAsync(int userId, ParceiroDto model);
        Task<ParceiroDto?> UpdateAsync(int userId, int parceiroId, ParceiroDto model);
        Task<ParceiroDto?> AlterarStatusAsync(int userId, int parceiroId);
    }
}