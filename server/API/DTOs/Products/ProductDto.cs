using API.Helpers;
using System.Collections.Generic;

namespace server.API.DTOs.Products
{
    public class ProductDto 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
    public class PagedProductDto{
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public List<ProductDto> Items { get; set; }

    }
}