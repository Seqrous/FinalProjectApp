using System;
using System.Linq;
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
            // Return all Products records and fetch price
            var products = _context.Products.Include(p => p.Prices)
                .Where(p => p.Prices.Any(price => DateTime.Compare(DateTime.Now, price.EndDate) < 0 && DateTime.Compare(DateTime.Now, price.StartDate) >= 0));
            
            foreach (Product product in products) {
                product.Price = product.Prices.ElementAt(0);
            }

            return await PagingList<Product>.CreateList(products, productParams.PageNumber, productParams.PageSize);
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