using System.Collections.Generic;

namespace API.DTOs.Orders
{
    public class OrderDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public long PaymentDate { get; set; }
        public string TotalPrice { get; set; }
        public IEnumerable<OrderlineDto> OrderLines { get; set; }
    }
    public class OrderlineDto
    {
        public string ID { get; set; }
        public string ProductId { get; set; }
        public int Amount { get; set; }
    }
}