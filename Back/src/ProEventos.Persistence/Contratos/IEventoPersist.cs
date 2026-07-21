using ProEventos.Domain.Entities;

namespace ProEventos.Persistence.Contratos;

public interface IEventoPersist
{
   Task<Evento?> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false);
   Task<IEnumerable<PalestranteEvento>> GetPalestrantesByEventoIdAsync(int eventoId);
   Task<bool> EventoExistsAsync(int userId, int eventoId);
   IQueryable<Evento> Query(int userId);
   IQueryable<Evento> Query();
}
