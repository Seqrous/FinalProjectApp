using System.Collections.Generic;
using Amazon.DynamoDBv2.DataModel;

namespace API.Entities
{
    [DynamoDBTable("FinalProject")]
    public class Order
    {
        [DynamoDBHashKey]
        public string ID { get; set; }

        [DynamoDBRangeKey]
        public string Sort { get; set; }

        public int PaymentDate { get; set; }
        public string TotalPrice { get; set; }
    }
}