using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.API.Interfaces
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetUserOrders(string userId);
        Task<Order> GetOrderById(string orderId);
    }
}
