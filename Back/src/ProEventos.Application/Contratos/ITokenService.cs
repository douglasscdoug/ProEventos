using ProEventos.Domain.Identity;

namespace ProEventos.Application.Contratos;

public interface ITokenService
{
   Task<string> CreateToken(User user);
}
