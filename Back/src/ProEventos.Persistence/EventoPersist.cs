using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Models;
using SQLitePCL;

namespace ProEventos.Persistence;

public class EventoPersist(ProEventosContext _context) : IEventoPersist
{
   public ProEventosContext Context { get; } = _context;
   public async Task<PageList<Evento?>> GetAllEventosAsync(int userId, PageParams pageParams, bool includePalestrantes)
   {
      IQueryable<Evento> query = Context.Eventos
          .Include(e => e.Lotes)
          .Include(e => e.RedesSociais);

      if (includePalestrantes)
      {
         query = query
            .Include(e => e.PalestrantesEventos!)
            .ThenInclude(pe => pe.Palestrante);
      }

      query = query
         .AsNoTracking()
         .Where(
            e => (e.Tema.ToLower().Contains(pageParams.Term.ToLower()) ||
                  e.Local.ToLower().Contains(pageParams.Term.ToLower())) && e.UserId == userId
            )
         .OrderBy(e => e.Id);

      return await PageList<Evento?>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
   }

   public async Task<Evento?> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes)
   {
      IQueryable<Evento> query = Context.Eventos
          .Include(e => e.Lotes)
          .Include(e => e.RedesSociais);

      if (includePalestrantes)
      {
         query = query
            .Include(e => e.PalestrantesEventos!)
            .ThenInclude(pe => pe.Palestrante!)
            .ThenInclude(p => p.User);
      }

      query = query.AsNoTracking().OrderBy(e => e.Id).Where(e => e.Id == eventoId && e.UserId == userId);

      return await query.FirstOrDefaultAsync();
   }

   public async Task<IEnumerable<PalestranteEvento>> GetPalestrantesByEventoIdAsync(int eventoId)
   {
      IQueryable<PalestranteEvento> query = Context.PalestrantesEventos;

      query = query.Where(pe => pe.EventoId == eventoId);

      return await query.ToArrayAsync();
   }
}