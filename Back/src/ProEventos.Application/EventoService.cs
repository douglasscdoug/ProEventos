using System;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;

public class EventoService(IGeralPersist geralPersist, IEventoPersist eventoPersist, IMapper mapper) : IEventoService
{
   public IGeralPersist GeralPersist { get; } = geralPersist;
   public IEventoPersist EventoPersist { get; } = eventoPersist;
   public IMapper Mapper { get; } = mapper;

   public async Task<EventoDto?> AddEvento(EventoDto model)
   {
      try
      {
         var evento = Mapper.Map<Evento>(model);

         GeralPersist.Add<Evento>(evento);

         if (await GeralPersist.SaveChangesAsync())
         {
            var eventoRetorno = await EventoPersist.GetEventoByIdAsync(evento.Id, false);
            return Mapper.Map<EventoDto>(eventoRetorno);
         }

         return null;
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
   }

   public async Task<EventoDto?> UpdateEvento(int eventoId, EventoDto model)
   {
        try
        {
            var evento = await EventoPersist.GetEventoByIdAsync(eventoId, false);
            if(evento == null) return null;

            model.Id = evento.Id;

            Mapper.Map(model, evento);

            GeralPersist.Update<Evento>(evento);

            if(await GeralPersist.SaveChangesAsync()){
               var eventoRetorno = await EventoPersist.GetEventoByIdAsync(evento.Id, false);
               return Mapper.Map<EventoDto>(eventoRetorno);
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
         if (evento == null)
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

   public async Task<EventoDto[]?> GetAllEventosAsync(bool includePalestrantes = false)
   {
      try
      {
         var eventos = await EventoPersist.GetAllEventosAsync(includePalestrantes);
         if (eventos == null)
         {
            return null;
         }

         var resultado = Mapper.Map<EventoDto[]>(eventos);

         return resultado;
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
   }

   public async Task<EventoDto[]?> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
   {
      try
      {
         var eventos = await EventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
         if (eventos == null)
         {
            return null;
         }

         var resultado = Mapper.Map<EventoDto[]>(eventos);

         return resultado;
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
   }

   public async Task<EventoDto?> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
   {
      try
      {
         var evento = await EventoPersist.GetEventoByIdAsync(eventoId, includePalestrantes);
         if (evento == null)
         {
            return null;
         }

         var resultado = Mapper.Map<EventoDto>(evento);

         return resultado;
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
   }
}
