using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence;

public class PalestrantePersist(ProEventosContext _context) : IPalestrantePersist
{
   public ProEventosContext Context { get; } = _context;

    public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos)
    {
        IQueryable<Palestrante> query = Context.Palestrantes.Include(p => p.RedesSociais);

         if(includeEventos)
         {
            query = query
               .Include(p => p.PalestrantesEventos)
               .ThenInclude(pe => pe.Evento);
         }

         query = query.AsNoTracking().OrderBy(p => p.Id);

         return await query.ToArrayAsync();
    }

    public async Task<Palestrante?> GetPalestranteById(int palestranteId, bool includeEventos)
    {
        IQueryable<Palestrante> query = Context.Palestrantes.Include(p => p.RedesSociais);

         if(includeEventos)
         {
            query = query
               .Include(p => p.PalestrantesEventos)
               .ThenInclude(pe => pe.Evento);
         }

         query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.Id == palestranteId);

         return await query.FirstOrDefaultAsync();
    }

    public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos)
    {
        IQueryable<Palestrante> query = Context.Palestrantes.Include(p => p.RedesSociais);

         if(includeEventos)
         {
            query = query
               .Include(p => p.PalestrantesEventos)
               .ThenInclude(pe => pe.Evento);
         }

         query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.User.Nome.ToLower().Contains(nome.ToLower()));

         return await query.ToArrayAsync();
    }
}
