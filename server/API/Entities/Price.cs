using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Price
    {
        public int Id { get; set; }
        public decimal ValidPrice { get; set; }

        [Column("ActiveIntervalStart")]
        public DateTime StartDate { get; set; }

        [Column("ActiveIntervalEnd")]
        public DateTime EndDate { get; set; }

        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}