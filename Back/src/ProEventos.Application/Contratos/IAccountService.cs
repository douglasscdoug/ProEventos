using Microsoft.AspNetCore.Http;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
    public interface IAccountService
    {
        Task<LoginResponseDto> LoginAsync(UserLoginDto userLogin);
        Task<LoginResponseDto> RegisterAsync(UserDto userDto);
        Task<LoginResponseDto> RefreshTokenAsync(string refreshToken);
        Task<LoginResponseDto> UpdateUserAsync(UserUpdateDto userUpdateDto, string loggedUserName);
        Task<UserDetailsDto> GetUserByUserNameAsync(string userName);
        Task<UserUpdateDto> UpdateProfileImageAsync(string userName, IFormFile file);
    }
}