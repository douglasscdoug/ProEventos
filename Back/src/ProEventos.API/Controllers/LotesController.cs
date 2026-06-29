using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Extensions;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class LotesController(ILoteService _loteService) : ControllerBase
{
    public ILoteService LoteService { get; } = _loteService;

    [HttpGet("{eventoId}")]
    public async Task<IActionResult> Get(int eventoId)
    {
        var lotes = await LoteService.GetLotesByEventoIdAsync(eventoId);
        if (lotes == null) return NoContent();

        return Ok(lotes);
    }

    [HttpPut("{eventoId}")]
    public async Task<IActionResult> SaveLotes(int eventoId, LoteDto[] models)
    {
        var lotes = await LoteService.SaveLotesAsync(User.GetUserId(), eventoId, models);

        return Ok(lotes);
    }

    [HttpDelete("{eventoId}/{loteId}")]
    public async Task<IActionResult> Delete(int eventoId, int loteId)
    {
        var deleted = await LoteService.DeleteLoteAsync(eventoId, loteId);

        if(!deleted) return NotFound();

        return NoContent();
    }
}