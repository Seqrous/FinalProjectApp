using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime DeliveryTime { get; set; }
        public IEnumerable<Orderline> Orderlines { get; set; }
        
        public AppUser User { get; set; }
        public int UserId { get; set; }
    }
}