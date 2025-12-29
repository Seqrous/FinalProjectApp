using System.Collections.Generic;

namespace API.DTOs.Products
{
    public class ProductDto 
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string Category { get; set; }
    }
    public class PagedProductDto
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public List<ProductDto> Items { get; set; }
    }
}