using AutoMapper;
using Microsoft.Extensions.Logging;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Application.Exceptions;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;

public class LoteService(
   IGeralPersist _geralPersist,
   ILotePersist _lotePersist,
   IMapper _mapper,
   ILogger<LoteService> _logger,
   IEventoPersist _eventoPersist) : ILoteService
{
   public IGeralPersist GeralPersist { get; } = _geralPersist;
   public ILotePersist LotePersist { get; set; } = _lotePersist;
   public IMapper Mapper { get; } = _mapper;
   public ILogger<LoteService> Logger { get; } = _logger;
   public IEventoPersist EventoPersist { get; } = _eventoPersist;

   public async Task<LoteDto[]?> GetLotesByEventoIdAsync(int eventoId)
   {
      var lotes = await LotePersist.GetLotesByEventoIdAsync(eventoId);
      if (lotes == null || lotes.Length == 0)
      {
         Logger.LogInformation("Não foi encontrado lotes para o evento id: {EventoId}", eventoId);
         return null;
      }

      var resultado = Mapper.Map<LoteDto[]>(lotes);

      Logger.LogInformation("Consulta com sucesso de lotes para o evento id: {EventoId}", eventoId);

      return resultado;
   }

   public async Task<LoteDto[]> SaveLotesAsync(int userId, int eventoId, LoteDto[] models)
   {
      Logger.LogInformation("Iniciando cadastro de lotes para o evento id: {EventoId}", eventoId);

      var evento = await EventoPersist.GetEventoByIdAsync(userId, eventoId);
      if (evento == null)
      {
         Logger.LogInformation("Tentativa de cadastro de lotes para evento inexistente.");
         throw new BusinessException("Lotes", "Evento não encontrado");
      }

      var lotesExistentes = await LotePersist.GetLotesByEventoIdAsync(eventoId);

      var lotesPorId = lotesExistentes.ToDictionary(l => l.Id);

      foreach (var model in models)
      {
         if (model.Id == 0)
         {
            ProcessarNovoLote(eventoId, model);
            continue;
         }

         ProcessarAtualizacaoLote(eventoId, model, lotesPorId);
      }

      await GeralPersist.SaveChangesAsync();

      var lotesRetorno = await LotePersist.GetLotesByEventoIdAsync(eventoId);

      return Mapper.Map<LoteDto[]>(lotesRetorno);
   }

   public async Task<bool> DeleteLoteAsync(int eventoId, int loteId)
   {
      Logger.LogInformation(
         "Iniciando exclusão de lote id: {LoteId} do evento id: {EventoID}",
         loteId,
         eventoId
      );

      var lote = await LotePersist.GetLoteByIdsAsync(eventoId, loteId);
      if (lote == null)
      {
         Logger.LogInformation("Tentativa de excluir lote inexistente.");
         throw new BusinessException("Lote", "Lote para delete não encontrado!");
      }
      GeralPersist.Delete<Lote>(lote);

      var sucess = await GeralPersist.SaveChangesAsync();

      if (sucess)
         Logger.LogInformation(
            "Lote id: {LoteId} do evento id: {EventoId} deletado com sucesso",
            loteId,
            eventoId
         );

      return sucess;
   }

   private void ProcessarNovoLote(int eventoId, LoteDto model)
   {
      model.EventoId = eventoId;

      var lote = Mapper.Map<Lote>(model);

      GeralPersist.Add(lote);
   }

   private void ProcessarAtualizacaoLote(int eventoId, LoteDto model, Dictionary<int, Lote> lotesPorId)
   {
      if (!lotesPorId.TryGetValue(model.Id, out var lote))
         throw new BusinessException(
             "Lotes",
             $"Lote {model.Id} não encontrado para atualização");

      model.EventoId = eventoId;

      Mapper.Map(model, lote);

      GeralPersist.Update(lote);
   }
}
