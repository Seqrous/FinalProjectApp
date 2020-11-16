using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace server.API.Data.Seeds
{
    public class Seed
    {
        public static async Task SeedData(DataContext _context) {

            if (await _context.Users.AnyAsync()) return ;

            // Read all the seeded data
            var userData = await System.IO.File.ReadAllTextAsync("Data/Seeds/UserSeedData.json");
            var addressData = await System.IO.File.ReadAllTextAsync("Data/Seeds/AddressSeedData.json");
            var productData = await System.IO.File.ReadAllTextAsync("Data/Seeds/ProductSeedData.json");
            var priceData = await System.IO.File.ReadAllTextAsync("Data/Seeds/PriceSeedData.json");
            var categoryData = await System.IO.File.ReadAllTextAsync("Data/Seeds/CategorySeedData.json");
            var productCategoryData = await System.IO.File.ReadAllTextAsync("Data/Seeds/ProductCategorySeedData.json");
            var orderlineData = await System.IO.File.ReadAllTextAsync("Data/Seeds/OrderlineSeedData.json");
            var orderData = await System.IO.File.ReadAllTextAsync("Data/Seeds/OrderSeedData.json"); 

            // Deserlialize seeded data
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            var addresses = JsonSerializer.Deserialize<List<Address>>(addressData);
            var products = JsonSerializer.Deserialize<List<Product>>(productData);
            var prices = JsonSerializer.Deserialize<List<Price>>(priceData);    
            var categories = JsonSerializer.Deserialize<List<Category>>(categoryData);
            var productCategories = JsonSerializer.Deserialize<List<ProductCategory>>(productCategoryData);
            var orderlines = JsonSerializer.Deserialize<List<Orderline>>(orderlineData);
            var orders = JsonSerializer.Deserialize<List<Order>>(orderData);

            // Add users to the database
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                // Encrypt the password and save the hash key
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
                user.PasswordSalt = hmac.Key;

                _context.Users.Add(user);
            }

            await _context.SaveChangesAsync();           

            // Add addresses to the database
            foreach (var address in addresses)
            {
                _context.Addresses.Add(address);
            }

            await _context.SaveChangesAsync();

            // Add products to the database
            foreach (var product in products)
            {
                product.ImageGalleryUrl = "";
                product.CreatedOn = DateTime.Now;

                _context.Products.Add(product);
            }

            await _context.SaveChangesAsync();
            
            // Add product prices to the database
            foreach (var price in prices)
            {
                price.StartDate = DateTime.Now;
                price.EndDate = DateTime.Now.AddYears(1);

                _context.Prices.Add(price);
            }

            await _context.SaveChangesAsync();

            // Add categories to the database
            foreach (var category in categories)
            {
                _context.Categories.Add(category);
            }

            await _context.SaveChangesAsync();

            // Add product-categories to the database
            foreach (var procat in productCategories)
            {
                _context.ProductCategories.Add(procat);
            }

            await _context.SaveChangesAsync();

            // Add orders to the database
            foreach (var order in orders)
            {
                order.DeliveryTime = DateTime.Now.AddDays(7);

                _context.Orders.Add(order);
            }

            await _context.SaveChangesAsync();

            // Add orderlines to the database
            foreach (var orderline in orderlines)
            {
                _context.Orderlines.Add(orderline);
            }

            await _context.SaveChangesAsync();
        }
    }
}