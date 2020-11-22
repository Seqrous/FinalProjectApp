using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Helpers;
using Microsoft.EntityFrameworkCore;
using server.API.Interfaces;
using System.Linq.Dynamic.Core;

namespace server.API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        public ProductRepository(DataContext context)
        {
            this._context = context;
        }

        public async Task<Product> InsertProduct(Product product)
        {
            product.Name = product.Name;
            product.Prices = product.Prices;
            product.Stock = product.Stock;
            _context.Products.Add(product);

            await SaveAllAsync();
            
            return product;
        }
        public async Task<Product> GetProductByIdAsync(int id) 
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Product> GetProductByNameAsync(string name)
        {
            return await _context.Products.FindAsync(name);
        }
        public async Task<PagingList<Product>> GetProductsAsync(PaginationModel productParams)
        {
            var products = _context.Products.Include(p => p.Prices).AsQueryable();

            products = products.Where(p => p.Prices.FirstOrDefault().ValidPrice <= productParams.MaxPrice || p.Prices.FirstOrDefault().ValidPrice >= productParams.MinPrice);

            return await PagingList<Product>.CreateList(products, productParams.PageNumber, productParams.PageSize);
        }
        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            var productWithPrices = _context.Prices.Include(p => p.ValidPrice).AsQueryable();
            productWithPrices = (IQueryable<Price>)_context.Products.Include(p => p.Prices).ToListAsync();
            return (IEnumerable<Product>)productWithPrices;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }
       
    }
   
}