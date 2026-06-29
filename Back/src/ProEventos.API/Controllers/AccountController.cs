using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Extensions;
using ProEventos.API.Helpers;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Application.Exceptions;

namespace ProEventos.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(IAccountService accountService, ITokenService tokenService, IUtil _util) : ControllerBase
    {
        public IAccountService AccountService { get; } = accountService;
        public ITokenService TokenService { get; } = tokenService;
        public IUtil Util { get; } = _util;
        private readonly string _destino = "Perfil";

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDto userLogin)
        {
            var result = await AccountService.LoginAsync(userLogin);
            return Ok(result);
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            var result = await AccountService.RegisterAsync(userDto);
            return Ok(result);
        }

        [HttpPost("Refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequestDto request)
        {
            var response = await AccountService.RefreshTokenAsync(request.RefreshToken);
            return Ok(response);
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UserUpdateDto userUpdateDto)
        {
            var loggedUserName = User.GetUserName();
            var result = await AccountService.UpdateUserAsync(userUpdateDto, loggedUserName);

            return Ok(result);
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
            var userName = User.GetUserName();
            var user = await AccountService.GetUserByUserNameAsync(userName);
            return Ok(user);
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null) throw new BusinessException("File", "Nenhum arquivo foi enviado.");

            var user = await AccountService.GetUserByUserNameAsync(User.GetUserName());

            if (user == null) throw new BusinessException("User", "Usuário não encontrado.");

            var oldImage = user.ImagemUrl;
            var newImage = await Util.SaveImage(file, _destino);

            try
            {
                var result = await AccountService.UpdateProfileImageAsync(user.UserName!, newImage);

                if (!string.IsNullOrWhiteSpace(oldImage)) Util.DeleteImage(oldImage, _destino);

                return Ok(result);
            }
            catch
            {
                if (!string.IsNullOrWhiteSpace(newImage)) Util.DeleteImage(newImage, _destino);

                throw;
            }
        }
    }
}
