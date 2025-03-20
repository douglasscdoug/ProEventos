using System;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;

public class LoteService(IGeralPersist _geralPersist, ILotePersist _lotePersist, IMapper _mapper) : ILoteService
{
   public IGeralPersist GeralPersist { get; } = _geralPersist;
   public ILotePersist LotePersist { get; set; } = _lotePersist;
   public IMapper Mapper { get; } = _mapper;

   public async Task<bool> DeleteLote(int eventoId, int loteId)
   {
      try
      {
         var lote = await LotePersist.GetLoteByIdsAsync(eventoId, loteId);
         if (lote == null)
         {
            new Exception("Lote para delete não encontrado!");
         }
         else
         {
            GeralPersist.Delete<Lote>(lote);
         }

         return await GeralPersist.SaveChangesAsync();
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
   }

   public async Task<LoteDto?> GetLoteByIdsAsync(int eventoId, int loteId)
   {
      try
      {
         var lote = await LotePersist.GetLoteByIdsAsync(eventoId, loteId);
         if (lote == null)
         {
            return null;
         }

         var resultado = Mapper.Map<LoteDto>(lote);

         return resultado;
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
   }

   public async Task<LoteDto[]?> GetLotesByEventoIdAsync(int eventoId)
   {
      try
      {
         var lotes = await LotePersist.GetLotesByEventoIdAsync(eventoId);
         if (lotes == null)
         {
            return null;
         }

         var resultado = Mapper.Map<LoteDto[]>(lotes);

         return resultado;
      }
      catch (Exception ex)
      {
         throw new Exception(ex.Message);
      }
   }

   public async Task<LoteDto[]?> SaveLotes(int eventoId, LoteDto[] models)
   {
      try
        {
            var lotes = await LotePersist.GetLotesByEventoIdAsync(eventoId);
            if(lotes == null) return null;

            foreach (var model in models)
            {
               if (model.Id == 0)
               {
                  await AddLote(eventoId, model);
               }
               else
               {
                  var lote = lotes.FirstOrDefault(l => l.Id == model.Id);
                  model.EventoId = eventoId;

                  Mapper.Map(model, lote);

                  GeralPersist.Update<Lote>(lote);

                 await GeralPersist.SaveChangesAsync();
               }
            }
            var lotesRetorno = await LotePersist.GetLotesByEventoIdAsync(eventoId);
            return Mapper.Map<LoteDto[]>(lotesRetorno);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
   }

   public async Task AddLote (int eventoId, LoteDto model)
   {
      try
      {
         var lote = Mapper.Map<Lote>(model);
         lote.EventoId = eventoId;

         GeralPersist.Add<Lote>(lote);

         await GeralPersist.SaveChangesAsync();
      }
      catch (Exception ex)
      {
         
         throw new Exception(ex.Message);
      }
   }
}
