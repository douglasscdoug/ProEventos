using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence;

public class RefreshTokenPersist(ProEventosContext _context) : IRefreshTokenPersist
{
    public ProEventosContext Context { get; } = _context;

    public async Task<RefreshToken?> GetByTokenAsync(string token)
    {
        return await Context.RefreshTokens.Include(rt => rt.User).FirstOrDefaultAsync(rt => rt.Token == token);
    }
}