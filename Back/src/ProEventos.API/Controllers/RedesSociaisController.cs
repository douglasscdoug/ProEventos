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

        [HttpPut("Evento/{eventoId}")]
        public async Task<IActionResult> SaveByEvento(int eventoId, [FromBody] RedeSocialDto[] models)
        {
            var result = await RedeSocialService.SaveByEventoAsync(User.GetUserId(), eventoId, models);
            return Ok(result);
        }

        [HttpPut("Palestrante/{palestranteId}")]
        public async Task<IActionResult> SaveByPalestrante(int palestranteId, [FromBody] RedeSocialDto[] models)
        {
            var result = await RedeSocialService.SaveByPalestranteAsync(User.GetUserId(), palestranteId, models);
            return Ok(result);
        }

        [HttpGet("Evento/{eventoId}")]
        public async Task<IActionResult> GetByEvento(int eventoId)
        {
            var result = await RedeSocialService.GetAllByEventoIdAsync(User.GetUserId(), eventoId);
            if (result.Length == 0) return NoContent();

            return Ok(result);
        }

        [HttpGet("Palestrante/{palestranteId}")]
        public async Task<IActionResult> GetByPalestrante(int palestranteId)
        {
            var result = await RedeSocialService.GetAllByPalestranteIdAsync(User.GetUserId(), palestranteId);
            if (result.Length == 0) return NoContent();

            return Ok(result);
        }

        [HttpDelete("Evento/{eventoId}/{redeSocialId}")]
        public async Task<IActionResult> DeleteByEvento(int eventoId, int redeSocialId)
        {
            await RedeSocialService.DeleteByEventoAsync(User.GetUserId(), eventoId, redeSocialId);
            return NoContent();
        }

        [HttpDelete("Palestrante/{palestranteId}/{redeSocialId}")]
        public async Task<IActionResult> DeleteByPalestrante(int palestranteId, int redeSocialId)
        {
            await RedeSocialService.DeleteByPalestranteAsync(User.GetUserId(), palestranteId, redeSocialId);
            return NoContent();
        }
    }
}
