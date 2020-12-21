<<<<<<< HEAD
=======
﻿using System.Collections.Generic;

>>>>>>> 0034d15 (full commit wtth all the missing classes)
namespace API.DTOs.Orders
{
    public class OrderDto
    {
        public string Id { get; set; }
<<<<<<< HEAD
        public long PaymentDate { get; set; }
        public string TotalPrice { get; set; }
=======
        public string UserId { get; set; }
        public long PaymentDate { get; set; }
        public string TotalPrice { get; set; }
        public IEnumerable<OrderlineDto> OrderLines { get; set; }
    }
    public class OrderlineDto
    {
        public string ID { get; set; }
        public string Sort { get; set; }
        public int Amount { get; set; }
>>>>>>> 0034d15 (full commit wtth all the missing classes)
    }
}