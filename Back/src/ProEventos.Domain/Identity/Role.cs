using System;
using Microsoft.AspNetCore.Identity;

namespace ProEventos.Domain.Identity;

public class Role : IdentityRole<int>
{
   public IEnumerable<UserRole> UserRoles { get; set; }
}
