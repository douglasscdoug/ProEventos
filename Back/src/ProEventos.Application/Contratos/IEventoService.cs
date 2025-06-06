using ProEventos.Application.Dtos;
using ProEventos.Persistence.Models;

namespace ProEventos.Application.Contratos;

public interface IEventoService
{
   Task<EventoDto?> AddEvento(int userId, EventoDto model);
   Task<EventoDto?> UpdateEvento(int userId, int eventoId, EventoDto model);
   Task<bool> DeleteEvento(int userId, int eventoId);
   Task<bool> AdicionarPalestrantesAoEvento(int userId, int eventoId, List<PalestranteEventoDto> palestrantes);
   Task<PageList<EventoDto>?> GetAllEventosAsync(int userId, PageParams pageParams, bool includePalestrantes = false);
   Task<EventoDto?> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes);
}
