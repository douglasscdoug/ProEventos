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

   public async Task<EventoDto?> AddEvento(int userId, EventoDto model)
   {
      try
      {
         var evento = Mapper.Map<Evento>(model);
         evento.UserId = userId;

         GeralPersist.Add<Evento>(evento);

         if (await GeralPersist.SaveChangesAsync())
         {
            var eventoRetorno = await EventoPersist.GetEventoByIdAsync(evento.UserId, evento.Id, false);
            return Mapper.Map<EventoDto>(eventoRetorno);
         }

         return null;
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
   }

   public async Task<EventoDto?> UpdateEvento(int userId, int eventoId, EventoDto model)
   {
        try
        {
            var evento = await EventoPersist.GetEventoByIdAsync(userId, eventoId, false);
            if(evento == null) return null;

            model.Id = evento.Id;
            model.UserId = userId;

            Mapper.Map(model, evento);

            GeralPersist.Update<Evento>(evento);

            if(await GeralPersist.SaveChangesAsync()){
               var eventoRetorno = await EventoPersist.GetEventoByIdAsync(userId, evento.Id, false);
               return Mapper.Map<EventoDto>(eventoRetorno);
            }
            return null;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
   }

   public async Task<bool> DeleteEvento(int userId, int eventoId)
   {
      try
      {
         var evento = await EventoPersist.GetEventoByIdAsync(userId, eventoId, false);
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

   public async Task<EventoDto[]?> GetAllEventosAsync(int userId, bool includePalestrantes = false)
   {
      try
      {
         var eventos = await EventoPersist.GetAllEventosAsync(userId, includePalestrantes);
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

   public async Task<EventoDto[]?> GetAllEventosByTemaAsync(int userId, string tema, bool includePalestrantes = false)
   {
      try
      {
         var eventos = await EventoPersist.GetAllEventosByTemaAsync(userId, tema, includePalestrantes);
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

   public async Task<EventoDto?> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false)
   {
      try
      {
         var evento = await EventoPersist.GetEventoByIdAsync(userId, eventoId, includePalestrantes);
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
