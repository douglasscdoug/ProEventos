using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Entities;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class ParceiroPersist(ProEventosContext _context) : IParceiroPersist
    {
        public ProEventosContext Context { get; } = _context;

        public IQueryable<Parceiro> Query(int userId)
        {
            IQueryable<Parceiro> query = Context.Parceiros.Where(p => p.UserId == userId);
            return query.AsQueryable();
        }

        public async Task<Parceiro?> GetByIdAsync(int userId, int parceiroId)
        {
            var query = Context.Parceiros
                .AsNoTracking().Where(p => p.Id == parceiroId && p.UserId == userId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Parceiro?> GetByIdForUpdateAsync(int userId, int parceiroId)
        {
            var query = Context.Parceiros.Where(p => p.Id == parceiroId && p.UserId == userId);

            return await query.FirstOrDefaultAsync();
        }
    }

}