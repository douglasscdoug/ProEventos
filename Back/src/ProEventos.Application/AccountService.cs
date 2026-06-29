using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Application.Exceptions;
using ProEventos.Domain;
using ProEventos.Domain.Identity;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;

public class AccountService(
   UserManager<User> _userManager,
   SignInManager<User> _signInManager,
   IMapper _mapper,
   IUserPersist _userPersist,
   ILogger<AccountService> _logger,
   ITokenService _tokenService,
   IRefreshTokenPersist _refreshTokenPersist,
   IGeralPersist _geralPersist
) : IAccountService
{
   public UserManager<User> UserManager { get; } = _userManager;
   public SignInManager<User> SignInManager { get; } = _signInManager;
   public IMapper Mapper { get; } = _mapper;
   public IUserPersist UserPersist { get; } = _userPersist;
   public ILogger Logger { get; } = _logger;
   public ITokenService TokenService { get; set; } = _tokenService;
   public IRefreshTokenPersist RefreshTokenPersist { get; } = _refreshTokenPersist;
   public IGeralPersist GeralPersist { get; } = _geralPersist;

    public async Task<LoginResponseDto> LoginAsync(UserLoginDto userLogin)
   {
      var user = await UserManager.Users.SingleOrDefaultAsync(u => u.UserName == userLogin.UserName);

      if (user is null) throw new UnauthorizedException("Usuário ou senha inválidos");

      var result = await SignInManager.CheckPasswordSignInAsync(user, userLogin.Password, false);

      if (!result.Succeeded) throw new UnauthorizedException("Usuário ou senha inválidos");

      var token = await TokenService.CreateToken(user);
      var refreshToken = TokenService.GenerateRefreshToken();

      var refreshTokenEntity = new RefreshToken
      {
         Token = refreshToken,
         UserId = user.Id,
         ExpirationDate = DateTime.UtcNow.AddDays(7)
      };

      GeralPersist.Add(refreshTokenEntity);
      await GeralPersist.SaveChangesAsync();

      Logger.LogInformation(
         "Login realizado com sucesso para o usuário {UserName}",
         userLogin.UserName
      );

      return new LoginResponseDto
      {
         UserName = user.UserName!,
         Nome = user.Nome,
         Token = token,
         RefreshToken = refreshToken
      };
   }

   public async Task<LoginResponseDto> RegisterAsync(UserDto userDto)
   {
      var existingUser = await UserManager.FindByNameAsync(userDto.UserName);
      if (existingUser != null) throw new BusinessException("userName", "Já existe um usuário com esse nome.");

      var user = Mapper.Map<User>(userDto);
      var result = await UserManager.CreateAsync(user, userDto.Password);

      if (!result.Succeeded)
      {
         foreach (var error in result.Errors)
         {
            throw new BusinessException("Identity", error.Description);
         }
      }

      var token = await TokenService.CreateToken(user);
      var refreshToken = TokenService.GenerateRefreshToken();

      var refreshTokenEntity = new RefreshToken
      {
         Token = refreshToken,
         UserId = user.Id,
         ExpirationDate = DateTime.UtcNow.AddDays(7)
      };

      GeralPersist.Add(refreshTokenEntity);
      await GeralPersist.SaveChangesAsync();

      Logger.LogInformation(
            "Novo usuário criado com o userName: {UserName}",
            user.UserName
         );

      return new LoginResponseDto
      {
         UserName = user.UserName!,
         Nome = user.Nome,
         Token = token,
         RefreshToken = refreshToken
      };
   }

   public async Task<LoginResponseDto> RefreshTokenAsync(string refreshToken)
    {
        Logger.LogInformation("Iniciando processo de refresh token.");
        var token = await RefreshTokenPersist.GetByTokenAsync(refreshToken);

        if (token == null)
        {
            Logger.LogWarning("Tentativa de refresh token com token inexistente.");
            throw new UnauthorizedException("Refresh token inválido.");
        }
        if (token.Revoked)
        {
            Logger.LogWarning("Tentativa de refresh token com token revogado.");
            throw new UnauthorizedException("Refresh token revogado.");
        }
        if (token.ExpirationDate < DateTime.UtcNow)
        {
            Logger.LogWarning("Tentativa de refresh token com token expirado.");
            throw new UnauthorizedException("Refresh token expirado.");
        }

        token.Revoked = true;

        var novoAccessToken = await TokenService.CreateToken(token.User);
        var novoRefreshToken = TokenService.GenerateRefreshToken();

        GeralPersist.Add(new RefreshToken
        {
            Token = novoRefreshToken,
            UserId = token.UserId,
            ExpirationDate = DateTime.UtcNow.AddDays(7)
        });

        await GeralPersist.SaveChangesAsync();

        _logger.LogInformation(
            "Refresh token realizado com sucesso para usuário {UsuarioId}",
            token.UserId
        );

        return new LoginResponseDto
      {
         UserName = token.User.UserName!,
         Nome = token.User.Nome,
         Token = novoAccessToken,
         RefreshToken = novoRefreshToken
      };
    }

   public async Task<LoginResponseDto> UpdateUserAsync(UserUpdateDto userUpdateDto, string loggedUserName)
   {
      if (loggedUserName != userUpdateDto.UserName)
         throw new UnauthorizedException("Usuário inválido");
         
      var user = await UserPersist.GetUserByUserNameAsync(userUpdateDto.UserName);

      if (user == null)
         throw new BusinessException("User", "Usuário não encontrado.");

      userUpdateDto.Id = user.Id;

      Mapper.Map(userUpdateDto, user);

      if (!string.IsNullOrWhiteSpace(userUpdateDto.Password))
      {
         var tokenReset = await UserManager.GeneratePasswordResetTokenAsync(user);
         var passwordResult = await UserManager.ResetPasswordAsync(
            user,
            tokenReset,
            userUpdateDto.Password);

         if(!passwordResult.Succeeded)
         {
            var error = passwordResult.Errors.First().Description;
            throw new BusinessException("Password", error);
         }
      }

      var result = await UserManager.UpdateAsync(user);

      if (!result.Succeeded)
      {
         var error = result.Errors.First().Description;
         throw new BusinessException("User", error);
      }

      var token = await TokenService.CreateToken(user);

      Logger.LogInformation(
         "Atualização do usuário com userName: {UserName}",
         user.UserName
      );

      return new LoginResponseDto
      {
         UserName = user.UserName!,
         Nome = user.Nome,
         Token = token
      };
   }

   public async Task<UserUpdateDto> GetUserByUserNameAsync(string userName)
   {
         var user = await UserPersist.GetUserByUserNameAsync(userName);
         if (user == null) throw new BusinessException("User", "Erro ao buscar usuário.");

         var userUpdateDto = Mapper.Map<UserUpdateDto>(user);
         return userUpdateDto;
   }

    public async Task<UserUpdateDto> UpdateProfileImageAsync(string userName, string imagemUrl)
    {

      var user = await UserPersist.GetUserByUserNameAsync(userName);

      if (user == null) throw new BusinessException("User", "Usuário não encontrado");

      user.ImagemURL = imagemUrl;

      var result = await UserManager.UpdateAsync(user);

      if (!result.Succeeded) throw new BusinessException("User", result.Errors.First().Description);

      return Mapper.Map<UserUpdateDto>(user);
    }
}