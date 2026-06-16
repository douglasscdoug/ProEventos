using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Extensions;
using ProEventos.API.Helpers;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Application.Exceptions;
using ProEventos.Application.Filters;
using ProEventos.Persistence.Models;

namespace ProEventos.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EventosController(
    IEventoService _eventoService,
    IUtil _util,
    IAccountService _accountService
) : ControllerBase
{
    public IEventoService EventoService { get; } = _eventoService;
    public IUtil Util { get; } = _util;
    public IAccountService AccountService { get; } = _accountService;
    private readonly string _destino = "Images";

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] EventoFiltroDto filtro)
    {
        var result = await EventoService.Filtrar(User.GetUserId(), filtro);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var evento = await EventoService.GetEventoByIdAsync(User.GetUserId(), id, true);
        if (evento == null) return NotFound();

        return Ok(evento);
    }

    [HttpPost]
    public async Task<IActionResult> Post(EventoDto model)
    {
        var evento = await EventoService.AddEvento(User.GetUserId(), model);

        return Ok(evento);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, EventoDto model)
    {
        var evento = await EventoService.UpdateEvento(User.GetUserId(), id, model);
        if (evento == null) return NotFound();

        return Ok(evento);
    }

    [HttpPost("upload-image/{eventoId}")]
    public async Task<IActionResult> UploadImage(int eventoId, IFormFile file)
    {
        if (file == null) throw new BusinessException("File", "Nenhum arquivo foi enviado.");

        var evento = await EventoService.GetEventoByIdAsync(User.GetUserId(), eventoId, false);

        if (evento == null) throw new BusinessException("Evento", "Evento não encontrado");

        var oldImage = evento.ImagemUrl;
        var newImage = await Util.SaveImage(file, _destino);

        try
        {
            var result = await EventoService.UploadImageAsync(User.GetUserId(), eventoId, newImage);

            if (!string.IsNullOrWhiteSpace(oldImage)) Util.DeleteImage(oldImage, _destino);

            return Ok(result);
        }
        catch
        {
            if (!string.IsNullOrWhiteSpace(newImage)) Util.DeleteImage(newImage, _destino);
            throw;
        }
    }

    [HttpPut("palestrantes/{eventoId}")]
    public async Task<IActionResult> PutPalestrantes(int eventoId, List<PalestranteEventoDto> palestrantes)
    {
        var resultado = await EventoService.AdicionarPalestrantesAoEvento(User.GetUserId(), eventoId, palestrantes);

        if (!resultado) throw new BusinessException("Erro", "Erro ao tentar adicionar palestrantes");

        return Ok(new { message = "Adicionado" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await EventoService.DeleteEvento(User.GetUserId(), id);

        if(!deleted) return NotFound();

        return NoContent();
    }
}