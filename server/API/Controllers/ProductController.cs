using System.Collections.Generic;
using System.Threading.Tasks;
using API.Controllers;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<ActionResult<ProductDto>> FindProducts()
        {
            var products = await _productContext.GetAllProductsAsync();
            
            var productsToReturn = _mapper.Map<IEnumerable<ProductDto>>(products);
            
            return Ok(productsToReturn);

        }
    }
}