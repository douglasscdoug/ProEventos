using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;
using SQLitePCL;

namespace ProEventos.Persistence;

public class RedeSocialPersist(ProEventosContext _context) : GeralPersist(_context), IRedeSocialPersist
{
    public async Task<RedeSocial[]?> GetAllByEventoIdAsync(int eventoId)
    {
        IQueryable<RedeSocial> query = Context.RedesSociais;

        query = query.AsNoTracking().Where(rs => rs.EventoId == eventoId);

        return await query.ToArrayAsync();
    }

    public async Task<RedeSocial[]?> GetAllByPalestranteIdAsync(int palestranteId)
    {
        IQueryable<RedeSocial> query = Context.RedesSociais;

        query = query.AsNoTracking().Where(rs => rs.PalestranteId == palestranteId);

        return await query.ToArrayAsync();
    }

    public async Task<RedeSocial?> GetRedeSocialEventoByIdsAsync(int eventoId, int id)
    {
        IQueryable<RedeSocial> query = Context.RedesSociais;

        query = query.AsNoTracking().Where(rs => rs.EventoId == eventoId && rs.Id == id);

        return await query.FirstOrDefaultAsync();
    }

    public async Task<RedeSocial?> GetRedeSocialPalestranteByIdsAsync(int palestranteId, int id)
    {
        IQueryable<RedeSocial> query = Context.RedesSociais;

        query = query.AsNoTracking().Where(rs => rs.PalestranteId == palestranteId && rs.Id == id);

        return await query.FirstOrDefaultAsync();
    }
}
