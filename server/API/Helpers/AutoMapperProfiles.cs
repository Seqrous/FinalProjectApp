using API.DTOs.Users;
using API.Entities;
using AutoMapper;
using server.API.DTOs.Products;

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
            CreateMap<Product, ProductDto>();
            CreateMap<PagingList<Product>,PagedProductDto>();
        }
    }
}