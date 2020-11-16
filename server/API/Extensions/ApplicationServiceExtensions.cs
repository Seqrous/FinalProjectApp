using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using server.API.Data;
using server.API.Interfaces;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        /*
            Adds all application related services to the ServiceCollection
        */
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options => 
            {
               options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors();
            services.AddHealthChecks();

            return services;
        }
    }
}