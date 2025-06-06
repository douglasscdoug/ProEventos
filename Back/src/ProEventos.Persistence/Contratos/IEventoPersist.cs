using ProEventos.Domain;
using ProEventos.Persistence.Models;

namespace ProEventos.Persistence.Contratos;

public interface IEventoPersist
{
   Task<PageList<Evento?>> GetAllEventosAsync(int userId, PageParams pageParams, bool includePalestrantes = false);
   Task<Evento?> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false);
   Task<IEnumerable<PalestranteEvento>> GetPalestrantesByEventoIdAsync(int eventoId);
}
