using Microsoft.AspNetCore.Identity;
using ProEventos.Domain.Enum;

namespace ProEventos.Domain.Identity;

public class User : IdentityUser<int>
{
   public string Nome { get; set; }
   public string Sobrenome { get; set; }
   public Titulo Titulo { get; set; }
   public string ? Descricao { get; set; }
   public Funcao Funcao { get; set; }
   public string ? ImagemURL { get; set; }
   public IEnumerable<UserRole> UserRoles { get; set; }
}
