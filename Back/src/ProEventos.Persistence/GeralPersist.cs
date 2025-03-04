using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence;

public class GeralPersist(ProEventosContext _context) : IGeralPersist
{
   public ProEventosContext Context { get; } = _context;

    public void Add<T>(T entity) where T : class
    {
        Context.Add(entity);
    }

    public void Update<T>(T entity) where T : class
    {
        Context.Update(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
        Context.Remove(entity);
    }

    public void DeleteRange<T>(T[] entityArray) where T : class
    {
        Context.RemoveRange(entityArray);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return (await Context.SaveChangesAsync()) > 0;
    }
}
