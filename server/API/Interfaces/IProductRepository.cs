using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        /*
            Updates the product
        */
        void Update(Product product);
        /* 
            Insert a product
        */
        Task<Product> InsertProduct(Product product);

        /*
            Get product by its ID
        */
        Task<IEnumerable<Product>> GetProductByIdAsync(string id);

        /*
            Get product by its Name
        */
        Task<Product> GetProductByNameAsync(string name);

        /*
            Get all available products
        */
        Task<PagingList<Product>> GetProductsAsync(PaginationModel productParams);
    }
}