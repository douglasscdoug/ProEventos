using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProEventos.Application.Common.Utils;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Application.Exceptions;
using ProEventos.Domain.Entities;
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
   IGeralPersist _geralPersist,
   IPhotoService _photoService,
   IPalestrantePersist _palestrantePersist
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
   public IPhotoService PhotoService { get; } = _photoService;
   public IPalestrantePersist PalestrantePersist { get; } = _palestrantePersist;

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
      userUpdateDto.PhoneNumber = StringUtils.SomenteNumeros(userUpdateDto.PhoneNumber);

      await SincronizarPalestranteAsync(userUpdateDto);

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

    public async Task<UserUpdateDto> UpdateProfileImageAsync(string userName, IFormFile file)
    {

      var user = await UserPersist.GetUserByUserNameAsync(userName);

      if (user == null) throw new BusinessException("User", "Usuário não encontrado");

      if(file == null || file.Length == 0)
         throw new BusinessException("User", "Arquivo de imagem inválido");

      await using var stream = file.OpenReadStream();

      var uploadResult = await PhotoService.UploadImageAsync(stream, file.FileName, "proEventos/perfil");

      if(uploadResult == null)
         throw new BusinessException("User", "Erro ao fazer upload da imagem");

      if(!string.IsNullOrEmpty(user.ImagemPublicId))
      {
         var deleteResult = await PhotoService.DeleteImageAsync(user.ImagemPublicId);

         if(!deleteResult)
            Logger.LogWarning("Falha ao deletar imagem antiga do usuário id: {UserID}", user.Id);
      }

      user.ImagemURL = uploadResult.Url;
      user.ImagemPublicId = uploadResult.PublicId;

      var result = await UserManager.UpdateAsync(user);

      if (!result.Succeeded) throw new BusinessException("User", result.Errors.First().Description);

      Logger.LogInformation("Imagem de perfil do usuário id: {UserID} atualizada com sucesso.", user.Id);

      return Mapper.Map<UserUpdateDto>(user);
    }

    private async Task SincronizarPalestranteAsync(UserUpdateDto model)
   {
      var palestrante = await PalestrantePersist.GetPalestranteStatusByUserIdAsync(model.Id);

      bool deveSerpalestrante = model.Funcao == "Palestrante";

      if(deveSerpalestrante)
      {
         if(palestrante == null)
         {
            GeralPersist.Add(new Palestrante
            {
               UserId = model.Id,
               Ativo = true
            });

            await GeralPersist.SaveChangesAsync();
         }
         else if(!palestrante.Ativo)
         {
            palestrante.Ativo = true;
            GeralPersist.Update(palestrante);
            await GeralPersist.SaveChangesAsync();
         }
      }
      else if(palestrante?.Ativo == true)
      {
         palestrante.Ativo = false;
         GeralPersist.Update(palestrante);
         await GeralPersist.SaveChangesAsync();
      }
   }
}