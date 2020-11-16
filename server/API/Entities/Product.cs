using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Stock { get; set; }
        public string Description { get; set; }
        public string ImageGalleryUrl { get; set; }
        public DateTime CreatedOn { get; set; }
        public IEnumerable<Price> Prices { get; set; }
        public IEnumerable<ProductCategory> ProductCategories { get; set; }
    }
}