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
         .Include(p => p.User).Where(p => p.Ativo);

      return query.AsQueryable();
   }

   public async Task<Palestrante?> GetPalestranteByUserIdAsync(int userId, bool includeEventos)
   {
      IQueryable<Palestrante> query = Context.Palestrantes
         .Include(p => p.RedesSociais)
         .Include(p => p.User);

      if (includeEventos)
      {
         query = query
            .Include(p => p.PalestrantesEventos!)
            .ThenInclude(pe => pe.Evento);
      }

      query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.UserId == userId);

      return await query.FirstOrDefaultAsync();
   }

   public async Task<bool> PalestranteExistsAsync(int userId, int palestranteId)
   {
      return await Context.Palestrantes
      .AnyAsync(p => p.UserId == userId && p.Id == palestranteId && p.Ativo);
   }

   public async Task<Palestrante?> GetPalestranteStatusByUserIdAsync(int userId)
   {
      return await Context.Palestrantes.FirstOrDefaultAsync(p => p.UserId == userId);
   }
}