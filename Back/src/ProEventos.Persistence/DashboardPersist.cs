using Microsoft.EntityFrameworkCore;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Models;

namespace ProEventos.Persistence
{
    public class DashboardPersist(ProEventosContext context) : IDashboardPersist
    {
        public async Task<DashboardCardsData> GetCardsAsync(int userId)
        {
            var totalEventos = await context.Eventos.CountAsync(e => e.UserId == userId);
            var totalPalestrantes = await context.Palestrantes.CountAsync();
            var totalParceiros = await context.Parceiros.CountAsync(p => p.UserId == userId);

            return new DashboardCardsData(totalEventos, totalPalestrantes, totalParceiros);
        }

        public async Task<IEnumerable<DashboardEventosMesData>> GetEventosPorMesAsync(int userId)
        {
            var hoje = DateTime.UtcNow;
            var dataInicial = new DateTime(hoje.Year, hoje.Month, 1, 0, 0, 0, DateTimeKind.Utc).AddMonths(-11);

            var eventos = await context.Eventos
                .Where(e => e.UserId == userId && e.DataEvento.HasValue && e.DataEvento.Value >= dataInicial)
                .GroupBy(e => new
                {
                    e.DataEvento!.Value.Year,
                    e.DataEvento!.Value.Month
                })
                .Select(g => new
                {
                    g.Key.Year,
                    g.Key.Month,
                    Quantidade = g.Count()
                })
                .ToListAsync();

            var resultado = Enumerable
                .Range(0, 12)
                .Select(i =>
                {
                    var data = dataInicial.AddMonths(i);

                    var evento = eventos.FirstOrDefault(e => e.Year == data.Year && e.Month == data.Month);

                    return new DashboardEventosMesData(data.Year, data.Month, evento?.Quantidade ?? 0);
                });

            return resultado;
        }

        public async Task<IEnumerable<DashboardProximoEventoData>> GetProximosEventosAsync(int userId)
        {
            var agora = DateTime.UtcNow;

            return await context.Eventos
                .Where(e =>
                    e.UserId == userId &&
                    e.DataEvento.HasValue &&
                    e.DataEvento >= agora)
                .OrderBy(e => e.DataEvento)
                .Take(5)
                .Select(e => new DashboardProximoEventoData(
                    e.Id,
                    e.Tema,
                    e.DataEvento,
                    e.Local))
                .ToListAsync();
        }
    }
}