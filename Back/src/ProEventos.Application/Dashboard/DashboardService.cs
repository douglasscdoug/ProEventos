using ProEventos.Application.Dashboard.Dtos;
using ProEventos.Application.Dashboard.Interfaces;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application.Dashboard
{
    public class DashboardService(IDashboardPersist dashboardPersist) : IDashboardService
    {
        public async Task<DashboardDto> GetDashboardAsync(int userId)
        {
            var cards = await dashboardPersist.GetCardsAsync(userId);

            var eventosMes = await dashboardPersist.GetEventosPorMesAsync(userId);

            var proximosEventos = await dashboardPersist.GetProximosEventosAsync(userId);

            return new DashboardDto
            {
                Cards = new DashboardCardsDto
                {
                    TotalEventos = cards.TotalEventos,
                    TotalPalestrantes = cards.TotalPalestrantes,
                    TotalParceiros = cards.TotalParceiros
                },
                EventosPorMes = eventosMes.Select(x => new DashboardEventosMesDto
                {
                    Ano = x.Ano,
                    Mes = x.Mes,
                    Quantidade = x.Quantidade
                }),
                ProximosEventos = proximosEventos.Select(x => new DashboardProximoEventoDto
                {
                    Id = x.Id,
                    Tema = x.Tema,
                    Local = x.Local,
                    DataEvento = x.DataEvento
                })
            };
        }
    }
}