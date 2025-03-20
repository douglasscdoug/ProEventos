using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class LotesController(ILoteService _loteService) : ControllerBase
{
    public ILoteService LoteService { get; } = _loteService;

    [HttpGet("{eventoId}")]
    public async Task<IActionResult> Get(int eventoId)
    {
        try
        {
            var lotes = await LoteService.GetLotesByEventoIdAsync(eventoId);
            if (lotes == null) return NoContent();

            return Ok(lotes);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar lotes. Erro: {ex.Message}");
        }
    }

    [HttpPut("{eventoId}")]
    public async Task<IActionResult> SaveLotes(int eventoId, LoteDto[] models)
    {
        try
        {
            var lotes = await LoteService.SaveLotes(eventoId, models);
            if (lotes == null) return NoContent();

            return Ok(lotes);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar salvar lotes. Erro: {ex.Message}");
        }
    }

    [HttpDelete("{eventoId}/{loteId}")]
    public async Task<IActionResult> Delete(int eventoId, int loteId)
    {
        try
        {
            var lote = await LoteService.GetLoteByIdsAsync(eventoId, loteId);
            if (lote == null) return NoContent();

            return await LoteService.DeleteLote(eventoId, loteId)
                ? Ok(new { message = "Deletado" })
                : throw new Exception("Ocorreu um erro ao tentar deletar o lote.");
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar deletar lotes. Erro: {ex.Message}");
        }
    }
}