using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Persistence.Contexts;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventosController(IEventoService _eventoService) : ControllerBase
{
    public IEventoService EventoService { get; } = _eventoService;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var eventos = await EventoService.GetAllEventosAsync(true);
            if(eventos == null) return NotFound("Nenhum evento encontrado!");

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
            var evento = await EventoService.GetEventoByIdAsync(id, true);
            if(evento == null) return NotFound("Evento por Id não encontrado!");

            return Ok(evento);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
        }
    }

    [HttpGet("tema/{tema}")]
    public async Task<IActionResult> GetByTema(string tema)
    {
        try
        {
            var evento = await EventoService.GetAllEventosByTemaAsync(tema, true);
            if(evento == null) return NotFound("Eventos por tema não encontrados!");

            return Ok(evento);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post(Evento model)
    {
        try
        {
            var evento = await EventoService.AddEvento(model);
            if(evento == null) return BadRequest("Erro ao tentar adicionar evento!");

            return Ok(evento);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Evento model)
    {
        try
        {
            var evento = await EventoService.UpdateEvento(id, model);
            if(evento == null) return BadRequest("Erro ao tentar atualizar o evento!");

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
            if(await EventoService.DeleteEvento(id))
                return Ok("Deletado");
            else
                return BadRequest("Evento não deletado!");
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar deletar os eventos. Erro: {ex.Message}");
        }
    }
}
