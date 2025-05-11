using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Models;

namespace ProEventos.Persistence;

public class PalestrantePersist(ProEventosContext _context) : GeralPersist(_context), IPalestrantePersist
{
    public async Task<PageList<Palestrante?>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false)
    {
        IQueryable<Palestrante> query = Context.Palestrantes.Include(p => p.User).Include(p => p.RedesSociais);

         if(includeEventos)
         {
            query = query
               .Include(p => p.PalestrantesEventos!)
               .ThenInclude(pe => pe.Evento);
         }

         query = query
            .AsNoTracking()
            .Where(
               p => (p.MiniCurriculo!.ToLower().Contains(pageParams.Term.ToLower()) ||
                     p.User.Nome.ToLower().Contains(pageParams.Term.ToLower()) ||
                     p.User.Sobrenome.ToLower().Contains(pageParams.Term.ToLower())) &&
                     p.User.Funcao == Domain.Enum.Funcao.Palestrante
               )
            .OrderBy(p => p.Id);

         return await PageList<Palestrante?>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
    }

    public async Task<Palestrante?> GetPalestranteByUserIdAsync(int userId, bool includeEventos)
    {
        IQueryable<Palestrante> query = Context.Palestrantes.Include(p => p.RedesSociais).Include(p => p.User);

         if(includeEventos)
         {
            query = query
               .Include(p => p.PalestrantesEventos!)
               .ThenInclude(pe => pe.Evento);
         }

         query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.UserId == userId);

         return await query.FirstOrDefaultAsync();
    }
}
