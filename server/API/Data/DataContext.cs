using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.ApplyConfiguration<Product>(new ProductEntityConfiguration());
        }

        /*
            List of all EntityFramework entities
        */
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}