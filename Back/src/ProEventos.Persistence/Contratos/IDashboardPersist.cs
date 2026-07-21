using ProEventos.Persistence.Models;

namespace ProEventos.Persistence.Contratos
{
    public interface IDashboardPersist
    {
        Task<DashboardCardsData> GetCardsAsync(int userId);
        Task<IEnumerable<DashboardEventosMesData>> GetEventosPorMesAsync(int userId);
        Task<IEnumerable<DashboardProximoEventoData>> GetProximosEventosAsync(int userId);
    }
}