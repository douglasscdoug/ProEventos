using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos;

public interface IPalestrantePersist
{
   Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);
   Task<Palestrante?> GetPalestranteById(int palestranteId, bool includeEventos);
   Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos);
}
