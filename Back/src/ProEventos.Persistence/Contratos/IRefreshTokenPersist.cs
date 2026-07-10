using ProEventos.Domain.Entities;

namespace ProEventos.Persistence.Contratos;

public interface IRefreshTokenPersist
{
    Task<RefreshToken?> GetByTokenAsync(string token);
}