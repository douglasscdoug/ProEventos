using ProEventos.Application.Dashboard.Dtos;

namespace ProEventos.Application.Dashboard.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardDto> GetDashboardAsync(int userId);
    }
}