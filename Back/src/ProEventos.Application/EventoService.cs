using System;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProEventos.Application.Common.Utils;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Application.Filters;
using ProEventos.Domain;
using ProEventos.Persistence;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Models;

namespace ProEventos.Application;

public class EventoService(
   IGeralPersist geralPersist,
   IEventoPersist eventoPersist,
   IMapper mapper,
   ILogger<EventoService> logger) : IEventoService
{
   public IGeralPersist GeralPersist { get; } = geralPersist;
   public IEventoPersist EventoPersist { get; } = eventoPersist;
   public IMapper Mapper { get; } = mapper;
   public ILogger<EventoService> Logger { get; set; } = logger;

   public async Task<EventoDto?> AddEvento(int userId, EventoDto model)
   {
      try
      {
         var evento = Mapper.Map<Evento>(model);
         evento.UserId = userId;

         GeralPersist.Add<Evento>(evento);

         if (await GeralPersist.SaveChangesAsync())
         {
            var eventoRetorno = await EventoPersist.GetEventoByIdAsync(evento.UserId, evento.Id, true);
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
               var eventoRetorno = await EventoPersist.GetEventoByIdAsync(userId, evento.Id, true);
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

   public async Task<bool> AdicionarPalestrantesAoEvento(int userId, int eventoId, List<PalestranteEventoDto> palestrantes)
   {
      try
      {
         var evento = await EventoPersist.GetEventoByIdAsync(userId, eventoId, true);

         if (evento == null) throw new Exception("Evento não encontrado");

         var palestrantesExistentes = await EventoPersist.GetPalestrantesByEventoIdAsync(eventoId);
         if (palestrantesExistentes.Any()) GeralPersist.DeleteRange(palestrantesExistentes.ToArray());

         foreach (var palestrante in palestrantes)
         {
            GeralPersist.Add(new PalestranteEvento
            {
               EventoId = eventoId,
               PalestranteId = palestrante.PalestranteId
            });
         }

         return await GeralPersist.SaveChangesAsync();
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
   }

   public async Task<PageList<EventoDto>?> GetAllEventosAsync(int userId, PageParams pageParams, bool includePalestrantes = false)
   {
      try
      {
         var eventos = await EventoPersist.GetAllEventosAsync(userId, pageParams, includePalestrantes);
         if (eventos == null)
         {
            return null;
         }

         var resultado = Mapper.Map<PageList<EventoDto>>(eventos);

         resultado.CurrentPage = eventos.CurrentPage;
         resultado.TotalPages = eventos.TotalPages;
         resultado.PageSize = eventos.PageSize;
         resultado.TotalCount = eventos.TotalCount;

         return resultado;
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
   }

   public async Task<EventoDto?> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = true)
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

    public async Task<PagedResult<EventoDto>> Filtrar(int userId, EventoFiltroDto filtro)
    {
      Logger.LogInformation(
         "Iniciando filtro de eventos. Page={Page}, PageSize={PageSize}, Serch={Search}",
         filtro.Page,
         filtro.PageSize,
         filtro.Search
      );

      var query = EventoPersist.Query(userId);

      //Busca global
      if (!string.IsNullOrWhiteSpace(filtro.Search))
      {
         var termo = filtro.Search.ToLower();

         query = query.Where(e =>
            e.Tema.ToLower().Contains(termo) ||
            e.Local.Contains(termo));
      }
      
      //Busca por Tema
      if(!string.IsNullOrWhiteSpace(filtro.Tema))
      {
         var termo = filtro.Tema.ToLower();

         query = query.Where(e => e.Tema.ToLower().Contains(termo));
      }

      if (!string.IsNullOrWhiteSpace(filtro.Local))
      {
         var termo = filtro.Local.ToLower();

         query = query.Where(e => e.Local.ToLower().Contains(termo));
      }

      var total = await query.CountAsync();

      //Paginação
      var data = await query
         .Skip((filtro.Page - 1) * filtro.PageSize)
         .Take(filtro.PageSize)
         .ProjectTo<EventoDto>(Mapper.ConfigurationProvider)
         .ToListAsync();

      Logger.LogInformation(
         "Filtro de eventos finalizado. Total={Total}, Retornado={Retornados}",
         total,
         data.Count
      );

      return new PagedResult<EventoDto>
      {
         Data = data,
         Total = total,
         Page = filtro.Page,
         PageSize = filtro.PageSize
      };
    }
}
