using API.DTOs.Users;
using API.Entities;
using AutoMapper;
using API.DTOs.Products;
using API.DTOs.Orders;
using API.DTOs;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        /*
            Auto-maps given entities
        */
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, UserDto>();
            CreateMap<ProductDto, Product>();
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ID))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Sort));
            CreateMap<PagingList<Product>, PagedProductDto>();

            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ID))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Sort));
            CreateMap<Orderline, OrderlineDto>()
                .ForMember(dest => dest.Sort, opt => opt.MapFrom(src => src.ProductId));
        }
    }
}