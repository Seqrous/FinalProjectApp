using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Helpers;
using Microsoft.EntityFrameworkCore;
using server.API.Interfaces;

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
            //return await _context.Products.ToListAsync();
            var products = _context.Products.AsQueryable();
            return await PagingList<Product>.CreateList(products, productParams.PageNumber,productParams.PageSize);

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