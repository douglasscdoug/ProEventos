using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Extensions;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(IAccountService accountService, ITokenService tokenService) : ControllerBase
    {
        public IAccountService AccountService { get; } = accountService;
        public ITokenService TokenService { get; } = tokenService;

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var userName = User.GetUserName();
                var user = await AccountService.GetUserByUserNameAsync(userName);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar recuperar usuario. Erro: {ex.Message}");
            }
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            try
            {
                if(await AccountService.UserExists(userDto.Username))
                    return BadRequest("Usuario já existe");

                var user = await AccountService.CreateAccountAsync(userDto);

                if(user != null) return Ok(user);

                return BadRequest("Usuario não criado, tente novamente mais tarde.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar cadastrar usuario. Erro: {ex.Message}");
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDto userLogin)
        {
            try
            {
                var user = await AccountService.GetUserByUserNameAsync(userLogin.Username);

                if(user == null) return Unauthorized("Usuario ou senha invalido");

                var result = await AccountService.CheckUserPasswordAsync(user, userLogin.Password);

                if(result == null || !result.Succeeded) return Unauthorized();

                var _token = await TokenService.CreateToken(user); 

                return Ok( new {
                    userName = user.Username,
                    nome = user.Nome,
                    token = _token
                });
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar realizar login. Erro: {ex.Message}");
            }
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UserUpdateDto userUpdateDto)
        {
            try
            {
                var user = await AccountService.GetUserByUserNameAsync(User.GetUserName());
                if(user == null) return Unauthorized("Usuario invalido");

                var userReturn = await AccountService.UpdateAccount(userUpdateDto);

                if(userReturn == null) return NoContent();

                return Ok(userReturn);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar atualizar usuario. Erro: {ex.Message}");
            }
        }
    }
}
