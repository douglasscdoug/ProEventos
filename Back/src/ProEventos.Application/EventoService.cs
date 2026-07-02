using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProEventos.Application.Common.Utils;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Application.Exceptions;
using ProEventos.Application.Filters;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;

public class EventoService(
   IPhotoService photoService,
   IGeralPersist geralPersist,
   IEventoPersist eventoPersist,
   IMapper mapper,
   ILogger<EventoService> logger) : IEventoService
{
   public IPhotoService PhotoService { get; } = photoService;
   public IGeralPersist GeralPersist { get; } = geralPersist;
   public IEventoPersist EventoPersist { get; } = eventoPersist;
   public IMapper Mapper { get; } = mapper;
   public ILogger<EventoService> Logger { get; set; } = logger;

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
      if (!string.IsNullOrWhiteSpace(filtro.Tema))
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

      query = ApplyOrdering(query, filtro);

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

   public async Task<EventoDto?> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = true)
   {
      Logger.LogInformation("Buscando evento Id: {EventoId}, para usuário Id: {UserId}", eventoId, userId);

      var evento = await EventoPersist.GetEventoByIdAsync(userId, eventoId, includePalestrantes);
      if (evento == null)
      {
         Logger.LogInformation("Evento Id: {EventoId} não encontrado", eventoId);
         return null;
      }

      var resultado = Mapper.Map<EventoDto>(evento);

      Logger.LogInformation("Evento Id: {EventoId} encontrado com sucesso", eventoId);

      return resultado;
   }

   public async Task<EventoDto> AddEvento(int userId, EventoDto model)
   {
      Logger.LogInformation("Iniciando cadastro de novo evento");

      var evento = Mapper.Map<Evento>(model);
      evento.UserId = userId;

      GeralPersist.Add<Evento>(evento);

      var sucess = await GeralPersist.SaveChangesAsync();

      if (!sucess)
      {
         Logger.LogInformation("Erro ao cadastrar evento");

         throw new BusinessException("Erro", "Erro ao salvar evento");
      }

      var eventoRetorno = await EventoPersist.GetEventoByIdAsync(evento.UserId, evento.Id, true);
      return Mapper.Map<EventoDto>(eventoRetorno);
   }

   public async Task<EventoDto?> UpdateEvento(int userId, int eventoId, EventoDto model)
   {
      Logger.LogInformation("Iniciando atualização do evento id: {empresaId}", eventoId);

      var evento = await EventoPersist.GetEventoByIdAsync(userId, eventoId, false);
      if (evento == null)
      {
         Logger.LogInformation("Tentativa de atualização de evento inexistente id: {EventoId}", eventoId);

         return null;
      }

      model.Id = evento.Id;
      model.UserId = userId;

      Mapper.Map(model, evento);

      GeralPersist.Update<Evento>(evento);

      var sucess = await GeralPersist.SaveChangesAsync();

      if (!sucess)
      {
         Logger.LogInformation("Erro ao salvar evento id: {EventoId}", eventoId);

         throw new BusinessException("Erro", "Erro ao salvar evento");
      }

      var eventoRetorno = await EventoPersist.GetEventoByIdAsync(userId, evento.Id, true);
      Logger.LogInformation("Evento id: {EventoId} atualizado com sucesso.", eventoId);
      return Mapper.Map<EventoDto>(eventoRetorno);
   }

   public async Task<EventoDto> UploadImageAsync(int userId, int eventoId, IFormFile file)
   {
      var evento = await EventoPersist.GetEventoByIdAsync(userId, eventoId);

      if (evento == null) throw new BusinessException("Evento", "Evento não encontrado");

      if(file == null || file.Length == 0)
         throw new BusinessException("Evento", "Arquivo de imagem inválido");

      await using var stream = file.OpenReadStream();

      var uploadResult = await PhotoService.UploadImageAsync(stream, file.FileName, "proEventos/images");

      if(uploadResult == null)
         throw new BusinessException("Evento", "Erro ao fazer upload da imagem");

      if(!string.IsNullOrEmpty(evento.ImagemPublicId))
      {
         var deleteResult = await PhotoService.DeleteImageAsync(evento.ImagemPublicId);

         if(!deleteResult)
            Logger.LogWarning("Falha ao deletar imagem antiga do evento id: {EventoId}", eventoId);
      }

      evento.ImagemUrl = uploadResult.Url;
      evento.ImagemPublicId = uploadResult.PublicId;

      GeralPersist.Update<Evento>(evento);

      var sucess = await GeralPersist.SaveChangesAsync();

      if (!sucess)
      {
         Logger.LogInformation("Erro ao atualizar imagem do evento id: {EventoId}", eventoId);
         throw new BusinessException("Evento", "Erro ao salvar imagem do evento");
      }

      Logger.LogInformation("Imagem do evento id: {eventoId} atualizada com sucesso", eventoId);

      return Mapper.Map<EventoDto>(evento);
   }

   public async Task<bool> AdicionarPalestrantesAoEvento(int userId, int eventoId, List<PalestranteEventoDto> palestrantes)
   {
      Logger.LogInformation("Iniciando inserção de palestrantes ao evento id: {EventoId}", eventoId);
      var evento = await EventoPersist.GetEventoByIdAsync(userId, eventoId, true);

      if (evento == null) throw new BusinessException("Evento", "Evento não encontrado");

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

      var sucess = await GeralPersist.SaveChangesAsync();

      if (sucess) Logger.LogInformation("Palestrantes adicionados no evento id: {EventoId}", eventoId);

      return sucess;
   }

   public async Task<bool> DeleteEvento(int userId, int eventoId)
   {
      Logger.LogInformation("Iniciando exclusão de evento id: {EventoId}", eventoId);

      var evento = await EventoPersist.GetEventoByIdAsync(userId, eventoId, false);
      if (evento == null)
      {
         Logger.LogInformation("Tentativa de excluir evento inexistente id: {EventoId}", eventoId);

         return false;
      }

      GeralPersist.Delete<Evento>(evento);

      var sucess = await GeralPersist.SaveChangesAsync();

      if (sucess) Logger.LogInformation("Evento id: {EventoId} deletado com sucesso.", eventoId);

      return sucess;
   }

   private IQueryable<Evento> ApplyOrdering(IQueryable<Evento> query, PagedRequest filtro)
   {
      if (string.IsNullOrWhiteSpace(filtro.OrderBy))
         return query.OrderBy(e => e.Id);

      return filtro.OrderBy.ToLower() switch
      {
         "tema" => filtro.Desc
            ? query.OrderByDescending(e => e.Tema)
            : query.OrderBy(e => e.Tema),

         "local" => filtro.Desc
            ? query.OrderByDescending(e => e.Local)
            : query.OrderBy(e => e.Local),

         "dataevento" => filtro.Desc
            ? query.OrderByDescending(e => e.DataEvento)
            : query.OrderBy(e => e.DataEvento),

         "qtdpessoas" => filtro.Desc
            ? query.OrderByDescending(e => e.QtdPessoas)
            : query.OrderBy(e => e.QtdPessoas),

         _ => query.OrderBy(e => e.Id)
      };
   }
}
