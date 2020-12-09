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

        //[DynamoDBProperty("email")]
        public string Email { get; set; }
        //public string Address { get; set; }
        //[DynamoDBProperty("pwHash")]
        public string Phone { get; set; }
        public byte[] PasswordHash { get; set; }
        //[DynamoDBProperty("pwSalt")]
        public byte[] PasswordSalt { get; set; }
        public string Password { get; set; }
        /*public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public Address Address { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }*/
    }
}