using System;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain.Identity;
using ProEventos.Persistence;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;

public class AccountService(
   UserManager<User> _userManager,
   SignInManager<User> _signInManager,
   IMapper _mapper,
   IUserPersist _userPersist
) : IAccountService
{
   public UserManager<User> UserManager { get; } = _userManager;
   public SignInManager<User> SignInManager { get; } = _signInManager;
   public IMapper Mapper { get; } = _mapper;
   public IUserPersist UserPersist { get; } = _userPersist;

   public async Task<SignInResult?> CheckUserPasswordAsync(UserUpdateDto userUpdateDto, string password)
   {
      try
      {
         var user = await UserManager.Users.SingleOrDefaultAsync(u => u.UserName == userUpdateDto.Username);
         if(user != null) return await SignInManager.CheckPasswordSignInAsync(user, password, false);
         
         return null;
      }
      catch (Exception ex)
      {
         throw new Exception($"Erro ao tentar verificar o password. Erro: {ex.Message}");
      }
   }

   public async Task<UserDto?> CreateAccountAsync(UserDto userDto)
   {
      try
      {
         var user = Mapper.Map<User>(userDto);
         var result = await UserManager.CreateAsync(user, userDto.Password);

         if(result.Succeeded)
         {
            var userToReturn = Mapper.Map<UserDto>(user);
            return userToReturn;
         }

         return null;
      }
      catch (Exception ex)
      {
         throw new Exception($"Erro ao tentar criar conta. Erro: {ex.Message}");
      }
   }

   public async Task<UserUpdateDto?> GetUserByUserNameAsync(string userName)
   {
      try
      {
         var user = await UserPersist.GetUserByUserNameAsync(userName);
         if(user == null) return null;

         var userUpdateDto = Mapper.Map<UserUpdateDto>(user);
         return userUpdateDto;
      }
      catch (Exception ex)
      {
         throw new Exception($"Erro ao tentar criar usuario. Erro: {ex.Message}");
      }
   }

   public async Task<UserUpdateDto?> UpdateAccount(UserUpdateDto userUpdateDto)
   {
      try
      {
         var user = await UserPersist.GetUserByUserNameAsync(userUpdateDto.Username);
         if(user == null) return null;

         Mapper.Map(userUpdateDto, user);

         var token = await UserManager.GeneratePasswordResetTokenAsync(user);

         var result = await UserManager.ResetPasswordAsync(user, token, userUpdateDto.Password);

         UserPersist.Update(user);

         if(await UserPersist.SaveChangesAsync())
         {
            if(string.IsNullOrEmpty(user.UserName))
               throw new Exception("UserName inválido");
            var userRetorno = await UserPersist.GetUserByUserNameAsync(user.UserName);

            return Mapper.Map<UserUpdateDto>(userRetorno);
         }

         return null;
      }
      catch (Exception ex)
      {
         throw new Exception($"Erro ao tentar atualiza usuario. Erro: {ex.Message}");
      }
   }

   public async Task<bool> UserExists(string userName)
   {
      try
      {
         return await UserManager.Users.AnyAsync(user => user.UserName == userName.ToLower());
      }
      catch (Exception ex)
      {
         throw new Exception($"Erro ao tentar verificar se o usuario existe. Erro: {ex.Message}");
      }
   }
}
