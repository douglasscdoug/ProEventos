using ProEventos.Domain;
using ProEventos.Persistence.Models;

namespace ProEventos.Persistence.Contratos;

public interface IPalestrantePersist : IGeralPersist
{
   IQueryable<Palestrante> Query();
   Task<Palestrante?> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false);
   Task<bool> PalestranteExistsAsync(int userId, int palestranteId);
   Task<Palestrante?> GetPalestranteStatusByUserIdAsync(int userId);
}
