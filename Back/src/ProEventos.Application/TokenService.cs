using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain.Identity;

namespace ProEventos.Application;

public class TokenService : ITokenService
{
   public IConfiguration Config { get; }
   public UserManager<User> UserManager { get; }
   public IMapper Mapper { get; }
   public SymmetricSecurityKey Key { get; }

   public TokenService(IConfiguration config, UserManager<User> userManager, IMapper mapper) =>
        (Config, UserManager, Mapper, Key) = (
            config ?? throw new ArgumentNullException(nameof(config)),
            userManager ?? throw new ArgumentNullException(nameof(userManager)),
            mapper ?? throw new ArgumentNullException(nameof(mapper)),
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"] ?? throw new InvalidOperationException("TokenKey is missing in configuration.")))
        );

   public async Task<string> CreateToken(UserUpdateDto userUpdateDto)
   {
      var user = Mapper.Map<User>(userUpdateDto);

      if (user.Id == 0)
        throw new InvalidOperationException("User ID is invalid.");

      if (string.IsNullOrEmpty(user.UserName))
        throw new InvalidOperationException("User name is invalid.");

      var claims = new List<Claim>
      {
         new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
         new Claim(ClaimTypes.Name, user.UserName)
      };

      var roles = await UserManager.GetRolesAsync(user);

      claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

      var creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha512Signature);

      var tokenDescription = new SecurityTokenDescriptor
      {
         Subject = new ClaimsIdentity(claims),
         Expires = DateTime.Now.AddDays(1),
         SigningCredentials = creds
      };

      var tokenHandler = new JwtSecurityTokenHandler();

      var token = tokenHandler.CreateToken(tokenDescription);

      return tokenHandler.WriteToken(token);
   }
}
