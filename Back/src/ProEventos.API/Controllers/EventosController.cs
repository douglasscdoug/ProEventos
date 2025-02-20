using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Data;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventosController(DataContext _context) : ControllerBase
{
    public DataContext Context { get; } = _context;


    [HttpGet]
    public IEnumerable<Evento> Get()
    {
        return Context.Eventos;
    }

    [HttpGet("{id}")]
    public IEnumerable<Evento> GetById(int id)
    {
        return Context.Eventos.Where(e => e.EventoId == id);
    }

    [HttpPost]
    public string Post()
    {
        return "Exemplo de Post";
    }

    [HttpPut("{id}")]
    public string Put(int id)
    {
        return $"Exemplo de Put Id: {id}";
    }

    [HttpDelete("{id}")]
    public string Delete(int id)
    {
        return $"Exemplo de Delete por Id: {id}";
    }
}
