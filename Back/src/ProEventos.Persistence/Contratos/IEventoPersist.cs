using ProEventos.Domain;
using ProEventos.Persistence.Models;

namespace ProEventos.Persistence.Contratos;

public interface IEventoPersist
{
   Task<Evento?> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false);
   Task<IEnumerable<PalestranteEvento>> GetPalestrantesByEventoIdAsync(int eventoId);
   IQueryable<Evento> Query(int userId);
}
