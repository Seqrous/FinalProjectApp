using Amazon.DynamoDBv2.DataModel;
namespace API.Entities
{
    [DynamoDBTable("FinalProject")]
    public class AppUser
    {
        [DynamoDBHashKey]
        public string ID { get; set; }

        [DynamoDBRangeKey]
        public string Sort { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Password { get; set; }
    }
}