using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace server.API.Interfaces
{
    public interface IProductRepository
    {
        /*
            Updates the product
        */
        void Update(Product product);
        /*
            Saves all the changes asynchronously and track new entity
        */
        Task<bool> SaveAllAsync();
        /* 
            Insert a product
        */
        Task<Product> InsertProduct(Product product);
        // get product by its ID
        Task<Product> GetProductByIdAsync(int id);
        // get product by its Name
        Task<Product> GetProductByNameAsync(string name);
        // get all available products
        Task<PagingList<Product>> GetProductsAsync(PaginationModel productParams);


    }
}