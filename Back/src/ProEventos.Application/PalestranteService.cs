using System;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Models;

namespace ProEventos.Application;

public class PalestranteService(IMapper _mapper, IPalestrantePersist _palestrantePersist) : IPalestranteService
{
    public IMapper Mapper { get; } = _mapper;
    public IPalestrantePersist PalestrantePersist { get; } = _palestrantePersist;

    public async Task<PalestranteDto?> AddPalestrante(int userId, PalestranteAddDto model)
    {
        try
      {
         var palestrante = Mapper.Map<Palestrante>(model);
         palestrante.UserId = userId;

         PalestrantePersist.Add(palestrante);

         if (await PalestrantePersist.SaveChangesAsync())
         {
            var PalestranteRetorno = await PalestrantePersist.GetPalestranteByUserIdAsync(palestrante.UserId, false);
            return Mapper.Map<PalestranteDto>(PalestranteRetorno);
         }

         return null;
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
    }

    public async Task<PalestranteDto?> UpdatePalestrante(int userId, PalestranteUpdateDto model)
    {
        try
        {
            var palestrante = await PalestrantePersist.GetPalestranteByUserIdAsync(userId, false);
            if(palestrante == null) return null;

            model.Id = palestrante.Id;
            model.UserId = userId;

            Mapper.Map(model, palestrante);

            PalestrantePersist.Update(palestrante);

            if(await PalestrantePersist.SaveChangesAsync()){
               var palestranteRetorno = await PalestrantePersist.GetPalestranteByUserIdAsync(userId, false);
               return Mapper.Map<PalestranteDto>(palestranteRetorno);
            }
            return null;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<PageList<PalestranteDto>?> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false)
    {
        try
      {
         var palestrantes = await PalestrantePersist.GetAllPalestrantesAsync(pageParams, includeEventos);
         if (palestrantes == null)
         {
            return null;
         }

         var resultado = Mapper.Map<PageList<PalestranteDto>>(palestrantes);

         resultado.CurrentPage = palestrantes.CurrentPage;
         resultado.TotalPages = palestrantes.TotalPages;
         resultado.PageSize = palestrantes.PageSize;
         resultado.TotalCount = palestrantes.TotalCount;

         return resultado;
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
    }

    public async Task<PalestranteDto?> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false)
    {
        try
      {
         var palestrante = await PalestrantePersist.GetPalestranteByUserIdAsync(userId, includeEventos);
         if (palestrante == null)
         {
            return null;
         }

         var resultado = Mapper.Map<PalestranteDto>(palestrante);

         return resultado;
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
    }
}
