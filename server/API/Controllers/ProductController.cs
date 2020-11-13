using System.Threading.Tasks;
using API.Controllers;
using API.Entities;
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;
using server.API.DTOs.Products;
using server.API.Interfaces;

namespace server.API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IProductRepository _productContext;

        public ProductsController(IProductRepository productContext, IMapper mapper)
        {
            this._productContext = productContext;
            this._mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct(ProductDto productDto)
        {
            // Map ProductDto to Product entity
            var product = _mapper.Map<Product>(productDto);

            // Insert to the database
            await _productContext.InsertProduct(product);

            // Map Product entity to ProductDto
            var productToReturn = _mapper.Map<ProductDto>(product);

            return productToReturn;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> FindProductByID(int id) 
        {
            var product = await _productContext.GetProductByIdAsync(id);
           
            var productsToReturn = _mapper.Map<ProductDto>(product);
            
            return Ok(productsToReturn);
        }

        [HttpGet]
        public async Task<ActionResult<PagedProductDto>> FindProducts(PaginationModel productParams)
        {
            var paginatedProducts = await _productContext.GetProductsAsync(productParams);

            var pagedResults = _mapper.Map<PagedProductDto>(paginatedProducts);
         
            return Ok(pagedResults);
        }
    }
}