using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence;

public class PalestrantePersist(ProEventosContext _context) : GeralPersist(_context), IPalestrantePersist
{
   public IQueryable<Palestrante> Query()
   {
      IQueryable<Palestrante> query = Context.Palestrantes
         .Include(p => p.User);

      return query.AsQueryable();
   }

   public async Task<Palestrante?> GetPalestranteByUserIdAsync(int userId, bool includeEventos)
   {
      IQueryable<Palestrante> query = Context.Palestrantes.Include(p => p.RedesSociais).Include(p => p.User);

      if (includeEventos)
      {
         query = query
            .Include(p => p.PalestrantesEventos!)
            .ThenInclude(pe => pe.Evento);
      }

      query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.UserId == userId);

      return await query.FirstOrDefaultAsync();
   }
}