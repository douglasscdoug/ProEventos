using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
    public interface IAccountService
    {
        Task<LoginResponseDto> LoginAsync(UserLoginDto userLogin);
        Task<LoginResponseDto> RegisterAsync(UserDto userDto);
        Task<LoginResponseDto> UpdateUserAsync(UserUpdateDto userUpdateDto, string loggedUserName);
        Task<UserUpdateDto> GetUserByUserNameAsync(string userName);
        Task<UserUpdateDto> UpdateProfileImageAsync(string userName, string imagemUrl);
    }
}