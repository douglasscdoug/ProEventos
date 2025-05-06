using System;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;

public class RedeSocialService(IRedeSocialPersist _redeSocialPersist, IMapper _mapper) : IRedeSocialService
{
    public IRedeSocialPersist RedeSocialPersist { get; } = _redeSocialPersist;
    public IMapper Mapper { get; } = _mapper;

    public async Task AddRedeSocial(int id, RedeSocialDto model, bool isEvento)
    {
        try
        {
            var redeSocial = Mapper.Map<RedeSocial>(model);

            if (isEvento)
            {
                redeSocial.EventoId = id;
            }
            else
            {
                redeSocial.PalestranteId = id;
            }

            RedeSocialPersist.Add<RedeSocial>(redeSocial);

            await RedeSocialPersist.SaveChangesAsync();
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }
    }

    public async Task<RedeSocialDto[]?> SaveByEvento(int eventoId, RedeSocialDto[] models)
    {
        try
        {
            var redesSociais = await RedeSocialPersist.GetAllByEventoIdAsync(eventoId);
            if (redesSociais == null) return null;

            foreach (var model in models)
            {
                if (model.Id == 0)
                {
                    await AddRedeSocial(eventoId, model, true);
                }
                else
                {
                    var redeSocial = redesSociais.FirstOrDefault(l => l.Id == model.Id);
                    model.EventoId = eventoId;

                    Mapper.Map(model, redeSocial);

                    if (redeSocial != null) RedeSocialPersist.Update(redeSocial);

                    await RedeSocialPersist.SaveChangesAsync();
                }
            }
            var redesSociaisRetorno = await RedeSocialPersist.GetAllByEventoIdAsync(eventoId);
            return Mapper.Map<RedeSocialDto[]>(redesSociaisRetorno);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<RedeSocialDto[]?> SaveByPalestrante(int palestranteId, RedeSocialDto[] models)
    {
        try
        {
            var redesSociais = await RedeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);
            if (redesSociais == null) return null;

            foreach (var model in models)
            {
                if (model.Id == 0)
                {
                    await AddRedeSocial(palestranteId, model, false);
                }
                else
                {
                    var redeSocial = redesSociais.FirstOrDefault(l => l.Id == model.Id);
                    model.PalestranteId = palestranteId;

                    Mapper.Map(model, redeSocial);

                    if (redeSocial != null) RedeSocialPersist.Update(redeSocial);

                    await RedeSocialPersist.SaveChangesAsync();
                }
            }
            var redesSociaisRetorno = await RedeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);
            return Mapper.Map<RedeSocialDto[]>(redesSociaisRetorno);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<bool> DeleteByEvento(int eventoId, int redeSocialId)
    {
        try
        {
            var redeSocial = await RedeSocialPersist.GetRedeSocialEventoByIdsAsync(eventoId, redeSocialId);
            if (redeSocial == null)
            {
                new Exception("Rede Social para delete por evento não encontrado!");
            }
            else
            {
                RedeSocialPersist.Delete(redeSocial);
            }

            return await RedeSocialPersist.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<bool> DeleteByPalestrante(int palestranteId, int redeSocialId)
    {
        try
        {
            var redeSocial = await RedeSocialPersist.GetRedeSocialPalestranteByIdsAsync(palestranteId, redeSocialId);
            if (redeSocial == null)
            {
                new Exception("Rede Social para delete por palestrante não encontrado!");
            }
            else
            {
                RedeSocialPersist.Delete(redeSocial);
            }

            return await RedeSocialPersist.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<RedeSocialDto[]?> GetAllByEventoIdAsync(int eventoId)
    {
        try
        {
            var redesSociais = await RedeSocialPersist.GetAllByEventoIdAsync(eventoId);
            if (redesSociais == null)
            {
                return null;
            }

            var resultado = Mapper.Map<RedeSocialDto[]>(redesSociais);

            return resultado;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<RedeSocialDto[]?> GetAllByPalestranteIdAsync(int palestranteId)
    {
        try
        {
            var redesSociais = await RedeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);
            if (redesSociais == null)
            {
                return null;
            }

            var resultado = Mapper.Map<RedeSocialDto[]>(redesSociais);

            return resultado;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<RedeSocialDto?> GetRedeSocialEventoByIdsAsync(int eventoId, int redeSocialId)
    {
        try
        {
            var redeSocial = await RedeSocialPersist.GetRedeSocialEventoByIdsAsync(eventoId, redeSocialId);
            if (redeSocial == null)
            {
                return null;
            }

            var resultado = Mapper.Map<RedeSocialDto>(redeSocial);

            return resultado;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<RedeSocialDto?> GetRedeSocialPalestranteByIdsAsync(int palestranteId, int redeSocialId)
    {
        try
        {
            var redeSocial = await RedeSocialPersist.GetRedeSocialPalestranteByIdsAsync(palestranteId, redeSocialId);
            if (redeSocial == null)
            {
                return null;
            }

            var resultado = Mapper.Map<RedeSocialDto>(redeSocial);

            return resultado;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}