using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Identity;
using ProEventos.Persistence.Contexts;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class UserPersist(ProEventosContext context) : GeralPersist(context), IUserPersist
    {
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await Context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await Context.Users.FindAsync(id);
        }

        public async Task<User?> GetUserByUserNameAsync(string username)
        {
            
            return await Context.Users.SingleOrDefaultAsync(u => u.UserName == username);
        }
        
    }
}