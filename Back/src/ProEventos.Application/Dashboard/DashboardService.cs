using ProEventos.Application.Dashboard.Dtos;
using ProEventos.Application.Dashboard.Interfaces;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application.Dashboard
{
    public class DashboardService(IDashboardPersist dashboardPersist) : IDashboardService
    {
        public async Task<DashboardDto> GetDashboardAsync(int userId)
        {
            var cardsTask = dashboardPersist.GetCardsAsync(userId);

            var eventosMesTask = dashboardPersist.GetEventosPorMesAsync(userId);

            var proximosEventosTask = dashboardPersist.GetProximosEventosAsync(userId);

            await Task.WhenAll(cardsTask, eventosMesTask, proximosEventosTask);

            return new DashboardDto
            {
                Cards = new DashboardCardsDto
                {
                    TotalEventos = cardsTask.Result.TotalEventos,
                    TotalPalestrantes = cardsTask.Result.TotalPalestrantes,
                    TotalParceiros = cardsTask.Result.TotalParceiros
                },
                EventosPorMes = eventosMesTask.Result.Select(x => new DashboardEventosMesDto
                {
                    Ano = x.Ano,
                    Mes = x.Mes,
                    Quantidade = x.Quantidade
                }),
                ProximosEventos = proximosEventosTask.Result.Select(x => new DashboardProximoEventoDto
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