using ProEventos.Application.Common.Utils;
using ProEventos.Application.Dtos;
using ProEventos.Application.Filters;
using ProEventos.Persistence.Models;

namespace ProEventos.Application.Contratos;

public interface IEventoService
{
   Task<PagedResult<EventoDto>> Filtrar(int userId, EventoFiltroDto filtro);
   Task<EventoDto?> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes);
   Task<EventoDto> AddEvento(int userId, EventoDto model);
   Task<EventoDto?> UpdateEvento(int userId, int eventoId, EventoDto model);
   Task<EventoDto> UploadImageAsync(int userId, int eventoId, string imagemUrl);
   Task<bool> AdicionarPalestrantesAoEvento(int userId, int eventoId, List<PalestranteEventoDto> palestrantes);
   Task<bool> DeleteEvento(int userId, int eventoId);
}
