using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventosController(IEventoService _eventoService, IWebHostEnvironment hostEnvironment) : ControllerBase
{
    public IEventoService EventoService { get; } = _eventoService;
    public IWebHostEnvironment HostEnvironment { get; } = hostEnvironment;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var eventos = await EventoService.GetAllEventosAsync(true);
            if(eventos == null) return NoContent();

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
            if(evento == null) return NoContent();

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
            if(evento == null) return NoContent();

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
            var evento = await EventoService.AddEvento(model);
            if(evento == null) return NoContent();

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
            var evento = await EventoService.GetEventoByIdAsync(eventoId);
            if(evento == null) return NoContent();

            var file = Request.Form.Files[0];

            if (file.Length > 0)
            {
                if(evento.ImagemUrl != null) DeleteImage(evento.ImagemUrl);
                
                evento.ImagemUrl = await SaveImage(file);
            }

            var eventoRetorno = await EventoService.UpdateEvento(eventoId, evento);

            return Ok(eventoRetorno);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, EventoDto model)
    {
        try
        {
            var evento = await EventoService.UpdateEvento(id, model);
            if(evento == null) return NoContent();

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
            var evento = await EventoService.GetEventoByIdAsync(id);
            if(evento == null) return NoContent();

            if (await EventoService.DeleteEvento(id))
            {   
                DeleteImage(evento.ImagemUrl);
                return Ok(new {message = "Deletado"});
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

    [NonAction]
    public async Task<string> SaveImage(IFormFile imageFile)
    {
        string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "-");

        imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imageFile.FileName)}";

        var imagePath = Path.Combine(HostEnvironment.ContentRootPath, @"Resources/Images", imageName);

        using(var fileStream = new FileStream(imagePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(fileStream);
        }

        return imageName;
    }

    [NonAction]
    public void DeleteImage(string imageName)
    {
        var imagePath = Path.Combine(HostEnvironment.ContentRootPath, @"Resources/Images", imageName);

        if(System.IO.File.Exists(imagePath))
            System.IO.File.Delete(imagePath);
    }
}
