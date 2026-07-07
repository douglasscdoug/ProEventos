using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Extensions;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Application.Filters;
using ProEventos.Persistence.Models;

namespace ProEventos.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PalestrantesController(
        IPalestranteService _palestranteService,
        IWebHostEnvironment hostEnvironment,
        IAccountService _accountService
    ) : ControllerBase
    {
        public IPalestranteService PalestranteService { get; } = _palestranteService;
        public IWebHostEnvironment HostEnvironment { get; } = hostEnvironment;
        public IAccountService AccountService { get; } = _accountService;

        [HttpGet("All")]
        public async Task<IActionResult> GetAll([FromQuery] PalestranteFiltroDto filtro)
        {
            var result = await PalestranteService.FiltrarAsync(filtro);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetPalestrantes()
        {
            var palestrante = await PalestranteService.GetPalestranteByUserIdAsync(User.GetUserId(), true);
            if (palestrante == null) return NoContent();

            return Ok(palestrante);
        }

        [HttpPost]
        public async Task<IActionResult> Post(PalestranteAddDto model)
        {
            var palestrante = await PalestranteService.GetPalestranteByUserIdAsync(User.GetUserId(), false);
            return Ok(palestrante);
        }

        [HttpPut]
        public async Task<IActionResult> Put(PalestranteUpdateDto model)
        {
            var palestrante = await PalestranteService.UpdatePalestrante(User.GetUserId(), model);
            if (palestrante == null) return NotFound();

            return Ok(palestrante);
        }
    }
}