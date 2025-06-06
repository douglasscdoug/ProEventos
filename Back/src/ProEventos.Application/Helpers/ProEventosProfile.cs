using AutoMapper;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Domain.Identity;

namespace ProEventos.Application.Helpers;

public class ProEventosProfile : Profile
{
  public ProEventosProfile()
  {
    CreateMap<Evento, EventoDto>()
      .ForMember(dest => dest.Palestrantes, opt => opt.MapFrom(src => src.PalestrantesEventos.Select(pe => pe.Palestrante))).ReverseMap();
    CreateMap<Lote, LoteDto>().ReverseMap();
    CreateMap<Palestrante, PalestranteDto>().ReverseMap();
    CreateMap<Palestrante, PalestranteAddDto>().ReverseMap();
    CreateMap<PalestranteEvento, PalestranteEventoDto>().ReverseMap();
    CreateMap<Palestrante, PalestranteUpdateDto>().ReverseMap();
    CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
    CreateMap<User, UserDto>().ReverseMap();
    CreateMap<User, UserLoginDto>().ReverseMap();
    CreateMap<User, UserUpdateDto>().ReverseMap();
  }
}
