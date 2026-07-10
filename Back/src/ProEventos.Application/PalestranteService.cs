using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProEventos.Application.Common.Utils;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Application.Exceptions;
using ProEventos.Application.Filters;
using ProEventos.Domain.Entities;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;

public class PalestranteService(
   IMapper _mapper,
   IPalestrantePersist _palestrantePersist,
   ILogger<PalestranteService> _logger) : IPalestranteService
{
   public IMapper Mapper { get; } = _mapper;
   public IPalestrantePersist PalestrantePersist { get; } = _palestrantePersist;
   public ILogger<PalestranteService> Logger { get; } = _logger;

   public async Task<PagedResult<PalestranteDto>> FiltrarAsync(PalestranteFiltroDto filtro)
   {
      Logger.LogInformation(
         "Iniciando filtro de palestrantes. Page={Page}, PageSize={PageSize}, Serch={Search}",
         filtro.Page,
         filtro.PageSize,
         filtro.Search
      );

      var query = PalestrantePersist.Query();

      //Busca global
      if (!string.IsNullOrWhiteSpace(filtro.Search))
      {
         var termo = filtro.Search.ToLower();

         query = query.Where(p =>
            p.User.Nome.ToLower().Contains(termo) ||
            p.User.Sobrenome.ToLower().Contains(termo) ||
            p.User.Email!.Contains(termo));
      }

      //Busca por nome
      if (!string.IsNullOrWhiteSpace(filtro.Nome))
      {
         var termo = filtro.Nome.ToLower();

         query = query.Where(p => p.User.Nome.ToLower().Contains(termo));
      }

      //Busca por sobrenome
      if (!string.IsNullOrWhiteSpace(filtro.Sobrenome))
      {
         var termo = filtro.Sobrenome.ToLower();

         query = query.Where(p => p.User.Sobrenome.ToLower().Contains(termo));
      }

      //Busca por E-mail
      if (!string.IsNullOrWhiteSpace(filtro.Email))
      {
         var termo = filtro.Email.ToLower();

         query = query.Where(p => p.User.Email!.ToLower().Contains(termo));
      }

      var total = await query.CountAsync();

      query = ApplyOrdering(query, filtro);

      //Paginação
      var data = await query
         .Skip((filtro.Page - 1) * filtro.PageSize)
         .Take(filtro.PageSize)
         .ProjectTo<PalestranteDto>(Mapper.ConfigurationProvider)
         .ToListAsync();

      Logger.LogInformation(
         "Filtro de palestrantes finalizado. Total={Total}, Retornado={Retornados}",
         total,
         data.Count
      );

      return new PagedResult<PalestranteDto>
      {
         Data = data,
         Total = total,
         Page = filtro.Page,
         PageSize = filtro.PageSize
      };
   }

   public async Task<PalestranteDto?> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false)
   {
      Logger.LogInformation(
         "Iniciando busca de palestrante por UserId. UserId={UserId}, IncludeEventos={IncludeEventos}",
         userId,
         includeEventos
      );

      var palestrante = await PalestrantePersist.GetPalestranteByUserIdAsync(userId, includeEventos);
      if (palestrante == null)
      {
         Logger.LogWarning(
            "Palestrante não encontrado para UserId={UserId}",
            userId
         );
         return null;
      }

      var resultado = Mapper.Map<PalestranteDto>(palestrante);
      Logger.LogInformation(
         "Busca de palestrante por UserId finalizada. UserId={UserId}, PalestranteId={PalestranteId}",
         userId,
         resultado.Id
      );

      return resultado;
   }

   public async Task<PalestranteDto> AddPalestrante(int userId, PalestranteAddDto model)
   {
      Logger.LogInformation(
         "Iniciando adição de palestrante. UserId={UserId}",
         userId
      );
      var palestrante = Mapper.Map<Palestrante>(model);
      palestrante.UserId = userId;
      palestrante.Ativo = true;

      PalestrantePersist.Add(palestrante);

      var sucess = await PalestrantePersist.SaveChangesAsync();
      if (!sucess) throw new BusinessException("Erro", "Erro ao salvar palestrante");

      var PalestranteRetorno = await PalestrantePersist.GetPalestranteByUserIdAsync(palestrante.UserId, false);

      return Mapper.Map<PalestranteDto>(PalestranteRetorno);
   }

   public async Task<PalestranteDto?> UpdatePalestrante(int userId, PalestranteUpdateDto model)
   {
      Logger.LogInformation(
         "Iniciando atualização de palestrante. UserId={UserId}, PalestranteId={PalestranteId}",
         userId,
         model.Id
      );

      var palestrante = await PalestrantePersist.GetPalestranteByUserIdAsync(userId, false);
      if (palestrante == null)
      {
         Logger.LogWarning(
            "Tentativa de atualização de palestrante inexistente. UserId={UserId}, PalestranteId={PalestranteId}",
            userId,
            model.Id
         );
         return null;
      }

      model.Id = palestrante.Id;
      model.UserId = userId;

      Mapper.Map(model, palestrante);

      PalestrantePersist.Update(palestrante);

      var sucess = await PalestrantePersist.SaveChangesAsync();

      if(!sucess) throw new BusinessException("Erro", "Erro ao salvar palestrante");

      var palestranteRetorno = await PalestrantePersist.GetPalestranteByUserIdAsync(userId, false);
      Logger.LogInformation(
         "Atualização de palestrante finalizada. UserId={UserId}, PalestranteId={PalestranteId}",
         userId,
         palestranteRetorno?.Id
      );
      return Mapper.Map<PalestranteDto>(palestranteRetorno);
   }

   private IQueryable<Palestrante> ApplyOrdering(IQueryable<Palestrante> query, PagedRequest filtro)
   {
      if (string.IsNullOrWhiteSpace(filtro.OrderBy))
         return query.OrderBy(e => e.Id);

      return filtro.OrderBy.ToLower() switch
      {
         "nome" => filtro.Desc
            ? query.OrderByDescending(p => p.User.Nome)
            : query.OrderBy(p => p.User.Nome),

         "sobrenome" => filtro.Desc
            ? query.OrderByDescending(p => p.User.Sobrenome)
            : query.OrderBy(p => p.User.Sobrenome),

         "email" => filtro.Desc
            ? query.OrderByDescending(p => p.User.Email)
            : query.OrderBy(p => p.User.Email),

         _ => query.OrderBy(p => p.Id)
      };
   }
}
