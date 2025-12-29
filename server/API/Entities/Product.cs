using Amazon.DynamoDBv2.DataModel;

namespace API.Entities
{
    [DynamoDBTable("FinalProject")]
    public class Product
    {
        [DynamoDBHashKey]
        public string ID { get; set; }

        [DynamoDBRangeKey]
        public string Sort { get; set; }
        
        public string Price { get; set; }
        public string Category { get; set; }
        public string Gallery { get; set; }
    }
}