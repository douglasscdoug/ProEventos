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

namespace ProEventos.Application
{
    public class ParceiroService(
        IGeralPersist geralPersist,
        IParceiroPersist parceiroPersist,
        IMapper mapper,
        ILogger<ParceiroService> logger
    ) : IParceiroService
    {
        public IGeralPersist GeralPersist { get; } = geralPersist;
        public IParceiroPersist ParceiroPersist { get; } = parceiroPersist;
        public IMapper Mapper { get; } = mapper;
        public ILogger<ParceiroService> Logger { get; } = logger;

        public async Task<PagedResult<ParceiroDto>> Filtrar(int userId, ParceiroFiltroDto filtro)
        {
            Logger.LogInformation(
                "Iniciando filtro de parceiros. Page={Page}, PageSize={PageSize}, Serch={Search}",
                filtro.Page,
                filtro.PageSize,
                filtro.Search
            );

            var query = ParceiroPersist.Query(userId);

            //Busca global
            if (!string.IsNullOrWhiteSpace(filtro.Search))
            {
                var termo = filtro.Search.ToLower();

                query = query.Where(p =>
                    p.Nome.ToLower().Contains(termo) ||
                    p.Responsavel.ToLower().Contains(termo));
            }

            //Busca por nome
            if (!string.IsNullOrWhiteSpace(filtro.Nome))
            {
                var termo = filtro.Nome.ToLower();

                query = query.Where(p => p.Nome.ToLower().Contains(termo));
            }

            //Busca por categoria
            if (filtro.Categoria.HasValue)
            {
                query = query.Where(p => p.Categoria == filtro.Categoria.Value);
            }

            //Busca por responsavel
            if (!string.IsNullOrWhiteSpace(filtro.Responsavel))
            {
                var termo = filtro.Responsavel.ToLower();

                query = query.Where(p => p.Responsavel.ToLower().Contains(termo));
            }

            //Busca por status
            if (filtro.Ativo.HasValue)
            {
                query = query.Where(p => p.Ativo == filtro.Ativo.Value);
            }

            var total = await query.CountAsync();

            query = ApplyOrdering(query, filtro);

            //Paginação
            var data = await query
                .Skip((filtro.Page - 1) * filtro.PageSize)
                .Take(filtro.PageSize)
                .ProjectTo<ParceiroDto>(Mapper.ConfigurationProvider)
                .ToListAsync();

            Logger.LogInformation(
                "Filtro de parceiros finalizado. Total={Total}, Retornado={Retornados}",
                total,
                data.Count
            );

            return new PagedResult<ParceiroDto>
            {
                Data = data,
                Total = total,
                Page = filtro.Page,
                PageSize = filtro.PageSize
            };
        }

        public async Task<ParceiroDto?> GetByIdAsync(int userId, int parceiroId)
        {
            Logger.LogInformation("Buscando parceiro id: {ParceiroId}, para usuário id: {UserId}", parceiroId, userId);

            var parceiro = await ParceiroPersist.GetByIdAsync(userId, parceiroId);
            if(parceiro == null)
            {
                Logger.LogInformation("Parceiro Id: {ParceiroId} não encontrado", parceiroId);
                return null;
            }

            var resultado = Mapper.Map<ParceiroDto>(parceiro);

            Logger.LogInformation("Parceiro Id: {ParceiroId} encontrado com sucesso", parceiroId);

            return resultado;
        }

        public async Task<ParceiroDto> AddAsync(int userId, ParceiroDto model)
        {
            Logger.LogInformation("Iniciando cadastro de novo parceiro");

            var parceiro = Mapper.Map<Parceiro>(model);
            parceiro.UserId = userId;

            GeralPersist.Add(parceiro);

            var sucess = await GeralPersist.SaveChangesAsync();

            if (!sucess) throw new BusinessException("Erro", "Erro ao salvar parceiro");

            Logger.LogInformation(
                "Parceiro {ParceiroId} cadastrado com sucesso",
                parceiro.Id
            );

            return Mapper.Map<ParceiroDto>(parceiro);
        }

        public async Task<ParceiroDto?> UpdateAsync(int userId, int parceiroId, ParceiroDto model)
        {
            Logger.LogInformation("Iniciando atualização do parceiro id: {parceiroId}", parceiroId);

            var parceiro = await ParceiroPersist.GetByIdForUpdateAsync(userId, parceiroId);
            if(parceiro == null)
            {
                Logger.LogInformation("Tentativa de atualização de parceiro inexistente id: {ParceiroId}", parceiroId);

                return null;
            }

            model.Id = parceiroId;
            model.UserId = userId;

            Mapper.Map(model, parceiro);

            GeralPersist.Update(parceiro);

            var sucess = await GeralPersist.SaveChangesAsync();

            if (!sucess) throw new BusinessException("Erro", "Erro ao salvar parceiro");

            Logger.LogInformation(
                "Parceiro {ParceiroId} atualizada com sucesso",
                parceiroId
            );

            return Mapper.Map<ParceiroDto>(parceiro);
        }

        public async Task<ParceiroDto?> AlterarStatusAsync(int userId, int parceiroId)
        {
            var parceiro = await ParceiroPersist.GetByIdForUpdateAsync(userId, parceiroId);

            if(parceiro == null) return null;

            parceiro.Ativo = !parceiro.Ativo;

            var status = parceiro.Ativo ? "ativado" : "desativado";

            var sucess = await GeralPersist.SaveChangesAsync();

            if(!sucess) throw new BusinessException("Erro", "Erro ao salvar status do parceiro");

            Logger.LogInformation(
                "Parceiro id: {ParceiroId} foi {Status} com sucesso.",
                parceiroId,
                status
            );

            return Mapper.Map<ParceiroDto>(parceiro);
        }

        private IQueryable<Parceiro> ApplyOrdering(IQueryable<Parceiro> query, PagedRequest filtro)
        {
            if (string.IsNullOrWhiteSpace(filtro.OrderBy))
                return query.OrderBy(p => p.Id);

            return filtro.OrderBy.ToLower() switch
            {
                "id" => filtro.Desc
                    ? query.OrderByDescending(p => p.Id)
                    : query.OrderBy(p => p.Id),

                "nome" => filtro.Desc
                    ? query.OrderByDescending(p => p.Nome)
                    : query.OrderBy(p => p.Nome),

                "categoria" => filtro.Desc
                    ? query.OrderByDescending(p => p.Categoria)
                    : query.OrderBy(p => p.Categoria),

                "responsavel" => filtro.Desc
                    ? query.OrderByDescending(p => p.Responsavel)
                    : query.OrderBy(p => p.Responsavel),

                _ => query.OrderBy(p => p.Id)
            };
        }
    }
}