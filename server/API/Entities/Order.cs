using System.Collections.Generic;
using Amazon.DynamoDBv2.DataModel;

namespace API.Entities
{
    public class Order
    {
        [DynamoDBHashKey]
        public string GlobalIndex { get; set; }

        [DynamoDBRangeKey]
        public string Sort { get; set; }
        
        public long PaymentDate { get; set; }
        public string TotalPrice { get; set; }
        public IEnumerable<Orderline> Orderlines { get; set; }
    }
}