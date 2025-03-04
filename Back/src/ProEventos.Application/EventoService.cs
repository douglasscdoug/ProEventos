using System;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;

public class EventoService(IGeralPersist geralPersist, IEventoPersist eventoPersist) : IEventoService
{
    public IGeralPersist GeralPersist { get; } = geralPersist;
    public IEventoPersist EventoPersist { get; } = eventoPersist;

    public async Task<Evento?> AddEvento(Evento model)
    {
        try
        {
            GeralPersist.Add<Evento>(model);
            if(await GeralPersist.SaveChangesAsync()){
               return await EventoPersist.GetEventoByIdAsync(model.Id, false);
            }
            return null;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Evento?> UpdateEvento(int eventoId, Evento model)
    {
        try
        {
            var evento = await EventoPersist.GetEventoByIdAsync(eventoId, false);
            if(evento == null) return null;

            model.Id = evento.Id;

            GeralPersist.Update(model);
            if(await GeralPersist.SaveChangesAsync()){
               return await EventoPersist.GetEventoByIdAsync(model.Id, false);
            }
            return null;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<bool> DeleteEvento(int eventoId)
    {
        try
        {
            var evento = await EventoPersist.GetEventoByIdAsync(eventoId, false);
            if(evento == null)
            {
               new Exception("Evento não encontrado!");
            }
            else
            {
               GeralPersist.Delete<Evento>(evento);
            }

            return await GeralPersist.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Evento[]?> GetAllEventosAsync(bool includePalestrantes = false)
    {
         try
         {
            var eventos = await EventoPersist.GetAllEventosAsync(includePalestrantes);
            if(eventos == null)
            {
               return null;
            }
            
            return eventos;
         }
         catch (Exception ex)
         {
            throw new Exception(ex.Message);
         }
    }

    public async Task<Evento[]?> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
    {
        try
         {
            var eventos = await EventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
            if(eventos == null)
            {
               return null;
            }
            
            return eventos;
         }
         catch (Exception ex)
         {
            throw new Exception(ex.Message);
         }
    }

    public async Task<Evento?> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
    {
        try
         {
            var evento = await EventoPersist.GetEventoByIdAsync(eventoId, includePalestrantes);
            if(evento == null)
            {
               return null;
            }
            
            return evento;
         }
         catch (Exception ex)
         {
            throw new Exception(ex.Message);
         }
    }
}
