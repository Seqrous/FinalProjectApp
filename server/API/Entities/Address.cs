using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Address
    {
        public int Id { get; set; }

        [Column("Address")]
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }

        public int UserId { get; set; }
        public AppUser User { get; set; }
    }
}