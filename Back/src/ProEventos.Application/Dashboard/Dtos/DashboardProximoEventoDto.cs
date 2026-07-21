namespace ProEventos.Application.Dashboard.Dtos
{
    public class DashboardProximoEventoDto
    {
        public int Id { get; set; }
        public string Tema { get; set; } = string.Empty;
        public DateTime? DataEvento { get; set; }
        public string Local { get; set; } = string.Empty;
    }
}