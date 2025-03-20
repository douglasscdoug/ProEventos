using System;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence;

public class LotePersist(ProEventosContext _context) : ILotePersist
{
   public ProEventosContext Context { get; } = _context;
   public async Task<Lote?> GetLoteByIdsAsync(int eventoId, int id)
   {
      IQueryable<Lote> query = Context.Lotes;

      query = query.AsNoTracking().Where(l => l.EventoId == eventoId && l.Id == id);

      return await query.FirstOrDefaultAsync();
   }

   public async Task<Lote[]?> GetLotesByEventoIdAsync(int eventoId)
   {
      IQueryable<Lote> query = Context.Lotes;

      query = query.AsNoTracking().Where(l => l.EventoId == eventoId);

      return await query.ToArrayAsync();
   }
}
