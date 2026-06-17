using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos;

public interface ILoteService
{
   Task<LoteDto[]?> GetLotesByEventoIdAsync(int eventoId);
   Task<LoteDto[]> SaveLotesAsync(int userId, int eventoId, LoteDto[] models);
   Task<bool> DeleteLoteAsync(int eventoId, int loteId);
}
