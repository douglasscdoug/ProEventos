using System;
using System.Security.Claims;

namespace ProEventos.API.Extensions;

public static class ClaimsPrincipalExtensions
{
   public static string GetUserName(this ClaimsPrincipal user)
   {
      return user.FindFirst(ClaimTypes.Name)?.Value ?? throw new Exception("Erro ao buscar usuario.");
   }

   public static int GetUserId(this ClaimsPrincipal user)
   {
      return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new Exception("Erro ao buscar usuario."));
   }
}
