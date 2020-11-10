using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; } 
        public int Quantity { get; set; }
        public string Category { get; set; }
        public string Manufacturer { get; set; }
        public string Description { get; set; }
        public ICollection<ProductPhoto> Photos { get; set; }
    }

    public class ProductEntityConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasMany<ProductPhoto>(p => p.Photos).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}