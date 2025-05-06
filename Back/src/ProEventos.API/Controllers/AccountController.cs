using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Extensions;
using ProEventos.API.Helpers;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

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
                if (await AccountService.UserExists(userDto.UserName))
                    return BadRequest("Usuario já existe");

                var user = await AccountService.CreateAccountAsync(userDto);

                if (user != null)
                {
                    var _token = await TokenService.CreateToken(user);
                    return Ok(new
                    {
                        userName = user.UserName,
                        nome = user.Nome,
                        token = _token
                    });
                }

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
                var user = await AccountService.GetUserByUserNameAsync(userLogin.UserName);

                if (user == null) return Unauthorized("Usuario ou senha invalido");

                var result = await AccountService.CheckUserPasswordAsync(user, userLogin.Password);

                if (result == null || !result.Succeeded) return Unauthorized();

                var _token = await TokenService.CreateToken(user);

                return Ok(new
                {
                    userName = user.UserName,
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
                if(userUpdateDto.UserName != User.GetUserName())
                    return Unauthorized("Usuário inválido");

                var user = await AccountService.GetUserByUserNameAsync(User.GetUserName());
                if (user == null) return Unauthorized("Usuario invalido");

                var userReturn = await AccountService.UpdateAccount(userUpdateDto);

                if (userReturn == null) return NoContent();

                return Ok(new 
                {
                    userName = userReturn.UserName,
                    nome = userReturn.Nome,
                    token = await TokenService.CreateToken(userReturn)
                });
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar atualizar usuario. Erro: {ex.Message}");
            }
        }

        [HttpPost("upload-image")]
    public async Task<IActionResult> UploadImage()
    {
        try
        {
            var user = await AccountService.GetUserByUserNameAsync(User.GetUserName());
            if (user == null) return NoContent();

            var file = Request.Form.Files[0];

            if (file.Length > 0)
            {
                if (user.ImagemUrl != null) Util.DeleteImage(user.ImagemUrl, _destino);

                user.ImagemUrl = await Util.SaveImage(file, _destino);
            }

            var userRetorno = await AccountService.UpdateAccount(user);

            return Ok(userRetorno);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar realizar upload de foto de perfil. Erro: {ex.Message}");
        }
    }
    }
}
