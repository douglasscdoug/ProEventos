using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;
using SQLitePCL;

namespace ProEventos.Persistence;

public class EventoPersist(ProEventosContext _context) : IEventoPersist
{
   public ProEventosContext Context { get; } = _context;
    public async Task<Evento[]?> GetAllEventosAsync(int userId, bool includePalestrantes)
    {
        IQueryable<Evento> query = Context.Eventos
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);

         if(includePalestrantes)
         {
            query = query
               .Include(e => e.PalestrantesEventos!)
               .ThenInclude(pe => pe.Palestrante);
         }

         query = query.AsNoTracking().Where(e => e.UserId == userId).OrderBy(e => e.Id);

         return await query.ToArrayAsync();
    }

    public async Task<Evento?> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes)
    {
        IQueryable<Evento> query = Context.Eventos
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);

         if(includePalestrantes)
         {
            query = query
               .Include(e => e.PalestrantesEventos!)
               .ThenInclude(pe => pe.Palestrante);
         }

         query = query.AsNoTracking().OrderBy(e => e.Id).Where(e => e.Id == eventoId && e.UserId == userId);

         return await query.FirstOrDefaultAsync();
    }

    public async Task<Evento[]> GetAllEventosByTemaAsync(int userId, string tema, bool includePalestrantes)
    {
        IQueryable<Evento> query = Context.Eventos
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);

         if(includePalestrantes)
         {
            query = query
               .Include(e => e.PalestrantesEventos!)
               .ThenInclude(pe => pe.Palestrante);
         }

         query = query.AsNoTracking().OrderBy(e => e.Id).Where(e => e.Tema.ToLower().Contains(tema.ToLower())&& e.UserId == userId);

         return await query.ToArrayAsync();
    }

}
