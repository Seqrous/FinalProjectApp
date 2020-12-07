using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using API.Entities;
using API.Helpers;
using API.Interfaces;

namespace server.API.Data
{
    public class ProductRepository : IProductRepository
    {
        private IQueryable<Product> Products;
        private DynamoDBContext _context;

        public ProductRepository(IAmazonDynamoDB dynamoDbClient)
        {
            if (dynamoDbClient == null) throw new ArgumentNullException(nameof(dynamoDbClient));
            _context = new DynamoDBContext(dynamoDbClient);
        }

        public async Task<Product> InsertProduct(Product product)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Product> GetProductByIdAsync(string id)
        {
            var product = await _context.QueryAsync<Product>(id).GetRemainingAsync();

            return product.First<Product>();
        }

        public async Task<Product> GetProductByNameAsync(string name)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagingList<Product>> GetProductsAsync(PaginationModel productParams)
        {
            // Filter records that are products
            List<ScanCondition> conditions = new List<ScanCondition>();
            conditions.Add(new ScanCondition("GlobalIndex", ScanOperator.Contains, "PRODUCT"));

            // Return the products
            var products = await _context.ScanAsync<Product>(conditions).GetRemainingAsync();

            // Paginate the results
            return PagingList<Product>.CreateList(products, productParams.PageNumber, productParams.PageSize);
        }

        public void Update(Product product)
        {
            throw new System.NotImplementedException();
        }
    }
}