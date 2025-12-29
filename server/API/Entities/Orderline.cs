using Amazon.DynamoDBv2.DataModel;

namespace API.Entities
{
    [DynamoDBTable("FinalProject")]
    public class Orderline
    {
        [DynamoDBHashKey]
        public string ID { get; set; }
        [DynamoDBRangeKey]
        public string Sort { get; set; }
        public int Amount { get; set; }
    }
}