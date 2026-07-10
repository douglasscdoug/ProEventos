using AutoMapper;
using Microsoft.Extensions.Logging;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Application.Exceptions;
using ProEventos.Domain.Entities;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;

public class RedeSocialService(
    IRedeSocialPersist _redeSocialPersist,
    IMapper _mapper,
    IEventoPersist _eventoPersist,
    IPalestrantePersist _palestrantePersist,
    ILogger<RedeSocialService> _logger) : IRedeSocialService
{
    public IRedeSocialPersist RedeSocialPersist { get; } = _redeSocialPersist;
    public IMapper Mapper { get; } = _mapper;
    public IEventoPersist EventoPersist { get; } = _eventoPersist;
    public IPalestrantePersist PalestrantePersist { get; } = _palestrantePersist;
    public ILogger<RedeSocialService> Logger { get; } = _logger;

    public async Task<RedeSocialDto[]> SaveByEventoAsync(int userId, int eventoId, RedeSocialDto[] models)
    {
        var eventoExist = await EventoPersist.EventoExistsAsync(userId, eventoId);
        if (!eventoExist)
            throw new BusinessException("RedesSociais", "Evento não encontrado ou não pertence ao usuário");

        var redesSociais = await RedeSocialPersist.GetAllByEventoIdAsync(eventoId);

        foreach (var model in models)
        {
            if (model.Id == 0)
            {
                model.EventoId = eventoId;

                var entity = Mapper.Map<RedeSocial>(model);
                RedeSocialPersist.Add(entity);
            }
            else
            {
                var redeSocial = redesSociais.FirstOrDefault(rs => rs.Id == model.Id)
                    ?? throw new BusinessException("RedeSocial", "Rede social não encontrada para atualização");
                model.EventoId = eventoId;

                Mapper.Map(model, redeSocial);
                RedeSocialPersist.Update(redeSocial);
            }
        }

        var result = await RedeSocialPersist.SaveChangesAsync();
        if (!result) throw new BusinessException(
            "RedeSocial",
            "Erro ao salvar redes sociais");

        Logger.LogInformation("Redes sociais salvas com sucesso para o evento {EventoId}", eventoId);

        var retorno = await RedeSocialPersist.GetAllByEventoIdAsync(eventoId);
        return Mapper.Map<RedeSocialDto[]>(retorno);
    }

    public async Task<RedeSocialDto[]> SaveByPalestranteAsync(int userId, int palestranteId, RedeSocialDto[] models)
    {
        var palestranteExist = await PalestrantePersist.PalestranteExistsAsync(userId, palestranteId);
        if (!palestranteExist)
            throw new BusinessException("RedesSociais", "Palestrante não encontrado ou não pertence ao usuário");

        var redesSociais = await RedeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);

        foreach (var model in models)
        {
            if (model.Id == 0)
            {
                model.PalestranteId = palestranteId;

                var entity = Mapper.Map<RedeSocial>(model);
                RedeSocialPersist.Add(entity);
            }
            else
            {
                var redeSocial = redesSociais.FirstOrDefault(rs => rs.Id == model.Id) ?? throw new BusinessException("RedeSocial", "Rede social não encontrada para atualização");
                model.PalestranteId = palestranteId;

                Mapper.Map(model, redeSocial);
                RedeSocialPersist.Update(redeSocial);
            }
        }

        var result = await RedeSocialPersist.SaveChangesAsync();
        if (!result) throw new BusinessException(
            "RedeSocial",
            "Erro ao salvar redes sociais");

        Logger.LogInformation("Redes sociais salvas com sucesso para o palestrante {PalestranteId}", palestranteId);

        var retorno = await RedeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);
        return Mapper.Map<RedeSocialDto[]>(retorno);
    }

    public async Task<RedeSocialDto[]> GetAllByEventoIdAsync(int userId, int eventoId)
    {
        var eventoExist = await EventoPersist.EventoExistsAsync(userId, eventoId);
        if (!eventoExist)
            throw new BusinessException("RedesSociais", "Evento não encontrado ou não pertence ao usuário");

        var redesSociais = await RedeSocialPersist.GetAllByEventoIdAsync(eventoId);

        return Mapper.Map<RedeSocialDto[]>(redesSociais);
    }

    public async Task<RedeSocialDto[]> GetAllByPalestranteIdAsync(int userId, int palestranteId)
    {
        var palestranteExist = await PalestrantePersist.PalestranteExistsAsync(userId, palestranteId);
        if (!palestranteExist)
            throw new BusinessException("RedesSociais", "Palestrante não encontrado ou não pertence ao usuário");

        var redesSociais = await RedeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);

        return Mapper.Map<RedeSocialDto[]>(redesSociais);
    }

    public async Task DeleteByEventoAsync(int userId, int eventoId, int redeSocialId)
    {
        Logger.LogInformation(
            "Iniciando exclusão da rede social id: {RedeSocialId} do evento id: {EventoId}",
            redeSocialId,
            eventoId);

        var eventoExist = await EventoPersist.EventoExistsAsync(userId, eventoId);
        if (!eventoExist)
            throw new BusinessException("RedeSocial", "Evento não encontrado ou não pertence ao usuário");

        var redeSocial = await RedeSocialPersist.GetRedeSocialEventoByIdsAsync(eventoId, redeSocialId);
        if (redeSocial == null)
            throw new BusinessException("RedeSocial", "Rede social para delete por evento não encontrada");

        RedeSocialPersist.Delete(redeSocial);

        var success = await RedeSocialPersist.SaveChangesAsync();
        if (!success) throw new BusinessException("RedeSocial", "Erro ao deletar rede social");

        Logger.LogInformation(
                "Rede social id: {RedeSocialId} do evento id: {EventoId} deletada com sucesso",
                redeSocialId,
                eventoId);
    }

    public async Task DeleteByPalestranteAsync(int userId, int palestranteId, int redeSocialId)
    {
        Logger.LogInformation(
            "Iniciando exclusão da rede social id: {RedeSocialId} do palestrante id: {PalestranteId}",
            redeSocialId,
            palestranteId);

        var palestranteExist = await PalestrantePersist.PalestranteExistsAsync(userId, palestranteId);
        if (!palestranteExist)
            throw new BusinessException("RedeSocial", "Palestrante não encontrado ou não pertence ao usuário");

        var redeSocial = await RedeSocialPersist.GetRedeSocialPalestranteByIdsAsync(palestranteId, redeSocialId);
        if (redeSocial == null)
            throw new BusinessException("RedeSocial", "Rede social para delete por palestrante não encontrada");

        RedeSocialPersist.Delete(redeSocial);

        var success = await RedeSocialPersist.SaveChangesAsync();
        if (!success) throw new BusinessException("RedeSocial", "Erro ao deletar rede social");

        Logger.LogInformation(
                "Rede social id: {RedeSocialId} do palestrante id: {PalestranteId} deletada com sucesso",
                redeSocialId,
                palestranteId);
    }
}