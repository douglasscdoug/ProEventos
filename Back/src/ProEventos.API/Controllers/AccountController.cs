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
        [AllowAnonymous]
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
            var result = await AccountService.UpdateProfileImageAsync(User.GetUserName(), file);
            return Ok(result);
        }
    }
}
