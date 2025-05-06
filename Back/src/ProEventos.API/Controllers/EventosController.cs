using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Extensions;
using ProEventos.API.Helpers;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
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
    public async Task<IActionResult> Get([FromQuery]PageParams pageParams)
    {
        try
        {
            var eventos = await EventoService.GetAllEventosAsync(User.GetUserId(), pageParams, true);
            if (eventos == null) return NoContent();

            Response.AddPagination(eventos.CurrentPage, eventos.PageSize, eventos.TotalCount, eventos.TotalPages);

            return Ok(eventos);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var evento = await EventoService.GetEventoByIdAsync(User.GetUserId(), id, true);
            if (evento == null) return NoContent();

            return Ok(evento);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post(EventoDto model)
    {
        try
        {
            var evento = await EventoService.AddEvento(User.GetUserId(), model);
            if (evento == null) return NoContent();

            return Ok(evento);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
        }
    }

    [HttpPost("upload-image/{eventoId}")]
    public async Task<IActionResult> UploadImage(int eventoId)
    {
        try
        {
            var evento = await EventoService.GetEventoByIdAsync(User.GetUserId(), eventoId);
            if (evento == null) return NoContent();

            var file = Request.Form.Files[0];

            if (file.Length > 0)
            {
                if (evento.ImagemUrl != null) Util.DeleteImage(evento.ImagemUrl, _destino);

                evento.ImagemUrl = await Util.SaveImage(file, _destino);
            }

            var eventoRetorno = await EventoService.UpdateEvento(User.GetUserId(), eventoId, evento);

            return Ok(eventoRetorno);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar fazer upload de imagem do evento. Erro: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, EventoDto model)
    {
        try
        {
            var evento = await EventoService.UpdateEvento(User.GetUserId(), id, model);
            if (evento == null) return NoContent();

            return Ok(evento);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar atualizar os eventos. Erro: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var evento = await EventoService.GetEventoByIdAsync(User.GetUserId(), id);
            if (evento == null) return NoContent();

            if (await EventoService.DeleteEvento(User.GetUserId(), id))
            {
                Util.DeleteImage(evento.ImagemUrl ?? throw new Exception("Url da Imagem inválida"), _destino);
                return Ok(new { message = "Deletado" });
            }
            else
            {
                throw new Exception("Ocorreu um erro ao tentar deletar o Evento.");
            }
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar deletar os eventos. Erro: {ex.Message}");
        }
    }
}