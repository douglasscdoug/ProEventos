using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos;

public interface IRedeSocialService
{
    //Refatorados
    Task<RedeSocialDto[]> SaveByEventoAsync(int userId, int eventoId, RedeSocialDto[] models);
    Task<RedeSocialDto[]> SaveByPalestranteAsync(int userId, int palestranteId, RedeSocialDto[] models);
    Task<RedeSocialDto[]> GetAllByEventoIdAsync(int userId, int eventoId);
    Task<RedeSocialDto[]> GetAllByPalestranteIdAsync(int userId,int palestranteId);
    Task DeleteByEventoAsync(int userId, int eventoId, int redeSocialId);
    Task DeleteByPalestranteAsync(int userId, int palestranteId, int redeSocialId);
}
