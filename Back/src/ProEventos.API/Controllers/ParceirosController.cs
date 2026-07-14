using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Extensions;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Application.Filters;

namespace ProEventos.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ParceirosController(IParceiroService parceiroService) : ControllerBase
    {
        public IParceiroService ParceiroService { get; } = parceiroService;

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] ParceiroFiltroDto filtro)
        {
            var parceiro = await ParceiroService.Filtrar(User.GetUserId(), filtro);
            return Ok(parceiro);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var parceiro = await ParceiroService.GetByIdAsync(User.GetUserId(), id);
            if (parceiro == null) return NotFound();

            return Ok(parceiro);
        }

        [HttpPost]
        public async Task<IActionResult> Post(ParceiroDto model)
        {
            var parceiro = await ParceiroService.AddAsync(User.GetUserId(), model);

            return CreatedAtAction(nameof(GetById), new { id = parceiro.Id }, parceiro);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ParceiroDto model)
        {
            var parceiro = await ParceiroService.UpdateAsync(User.GetUserId(), id, model);
            if (parceiro == null) return NotFound();

            return Ok(parceiro);
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> AlterarStatus(int id)
        {
            var parceiro = await ParceiroService.AlterarStatusAsync(User.GetUserId(), id);

            if (parceiro == null) return NotFound();

            return Ok(parceiro);
        }

        [HttpPost("upload-image/{parceiroId}")]
        public async Task<IActionResult> UploadImage(int parceiroId, IFormFile file)
        {
            var result = await ParceiroService.UploadImageAsync(User.GetUserId(), parceiroId, file);

            return Ok(result);
        }
    }
}