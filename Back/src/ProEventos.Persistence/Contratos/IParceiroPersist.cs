using ProEventos.Domain.Entities;

namespace ProEventos.Persistence.Contratos
{
    public interface IParceiroPersist
    {
        IQueryable<Parceiro> Query(int userId);
        Task<Parceiro?> GetByIdAsync(int userId, int parceiroId);
        Task<Parceiro?> GetByIdForUpdateAsync(int userId, int parceiroId);
    }
}