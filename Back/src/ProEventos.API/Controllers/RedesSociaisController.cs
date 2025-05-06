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
    public class RedesSociaisController(
            IRedeSocialService _redeSocialService,
            IEventoService _eventoService,
            IPalestranteService _palestranteService
        ) : ControllerBase
    {
        public IRedeSocialService RedeSocialService { get; } = _redeSocialService;
        public IEventoService EventoService { get; } = _eventoService;
        public IPalestranteService PalestranteService { get; } = _palestranteService;

        [HttpGet("Evento/{eventoId}")]
        public async Task<IActionResult> GetByEvento(int eventoId)
        {
            try
            {
                if(! await AutorEvento(eventoId)) return Unauthorized();

                var redesSocias = await RedeSocialService.GetAllByEventoIdAsync(eventoId);
                if (redesSocias == null) return NoContent();

                return Ok(redesSocias);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar redes socias. Erro: {ex.Message}");
            }
        }

        [HttpGet("Palestrante")]
        public async Task<IActionResult> GetByPalestrante()
        {
            try
            {
                var palestrante = await PalestranteService.GetPalestranteByUserIdAsync(User.GetUserId());
                if(palestrante == null) return Unauthorized();

                var redesSocias = await RedeSocialService.GetAllByPalestranteIdAsync(palestrante.Id);
                if (redesSocias == null) return NoContent();

                return Ok(redesSocias);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar redes socias. Erro: {ex.Message}");
            }
        }

        [HttpPut("Evento/{eventoId}")]
        public async Task<IActionResult> SaveByEvento(int eventoId, RedeSocialDto[] models)
        {
            try
            {
                if(! await AutorEvento(eventoId)) return Unauthorized();
                var redesSociais = await RedeSocialService.SaveByEvento(eventoId, models);
                if (redesSociais == null) return NoContent();

                return Ok(redesSociais);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar salvar redes sociais. Erro: {ex.Message}");
            }
        }

        [HttpPut("Palestrante")]
        public async Task<IActionResult> SaveByPalestrante(RedeSocialDto[] models)
        {
            try
            {
                var palestrante = await PalestranteService.GetPalestranteByUserIdAsync(User.GetUserId());
                if(palestrante == null) return Unauthorized();

                var redesSociais = await RedeSocialService.SaveByPalestrante(palestrante.Id, models);
                if (redesSociais == null) return NoContent();

                return Ok(redesSociais);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar salvar redes sociais. Erro: {ex.Message}");
            }
        }

        [HttpDelete("Evento/{eventoId}/{redeSocialId}")]
        public async Task<IActionResult> DeleteByEvento(int eventoId, int redeSocialId)
        {
            try
            {
                if(! await AutorEvento(eventoId)) return Unauthorized();
                var redeSocial = await RedeSocialService.GetRedeSocialEventoByIdsAsync(eventoId, redeSocialId);
                if (redeSocial == null) return NoContent();

                return await RedeSocialService.DeleteByEvento(eventoId, redeSocialId)
                    ? Ok(new { message = "Deletado" })
                    : throw new Exception("Ocorreu um erro ao tentar deletar a rede social.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar rede social. Erro: {ex.Message}");
            }
        }

        [HttpDelete("Palestrante/{redeSocialId}")]
        public async Task<IActionResult> DeleteByPalestrante(int redeSocialId)
        {
            try
            {
                var palestrante = await PalestranteService.GetPalestranteByUserIdAsync(User.GetUserId());
                if(palestrante == null) return Unauthorized();

                var redeSocial = await RedeSocialService.GetRedeSocialPalestranteByIdsAsync(palestrante.Id, redeSocialId);
                if (redeSocial == null) return NoContent();

                return await RedeSocialService.DeleteByPalestrante(palestrante.Id, redeSocialId)
                    ? Ok(new { message = "Deletado" })
                    : throw new Exception("Ocorreu um erro ao tentar deletar a rede social.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar rede social. Erro: {ex.Message}");
            }
        }

        [NonAction]
        private async Task<bool> AutorEvento(int eventoId)
        {
            var evento = await EventoService.GetEventoByIdAsync(User.GetUserId(), eventoId, false);

            if(evento == null) return false;

            return true;
        }
    }
}