namespace API.DTOs.Orders
{
    public class OrderDto
    {
        public string Id { get; set; }
        public long PaymentDate { get; set; }
        public string TotalPrice { get; set; }
    }
}