namespace ProEventos.Application.Dashboard.Dtos
{
    public class DashboardDto
    {
        public DashboardCardsDto Cards { get; set; } = null!;
        public IEnumerable<DashboardEventosMesDto> EventosPorMes { get; set; } = [];
        public IEnumerable<DashboardProximoEventoDto> ProximosEventos { get; set; } = [];
    }
}