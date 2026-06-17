using ProEventos.Domain;
using ProEventos.Persistence.Models;

namespace ProEventos.Persistence.Contratos;

public interface IPalestrantePersist : IGeralPersist
{
   IQueryable<Palestrante> Query();
   Task<Palestrante?> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false);
}
