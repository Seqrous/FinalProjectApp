using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private DynamoDBContext _context;

        public UserRepository(IAmazonDynamoDB dynamoDbClient)
        {
            if (dynamoDbClient == null) throw new ArgumentNullException(nameof(dynamoDbClient));
            _context = new DynamoDBContext(dynamoDbClient);
        }

        public async Task<AppUser> GetUserByIdAsync(string id)
        {
            var users = await _context.QueryAsync<AppUser>(id).GetRemainingAsync();

            return users.FirstOrDefault();
        }
        public async Task UpdateUser(AppUser user)
        {
            List<ScanCondition> conditions = new List<ScanCondition>();
            conditions.Add(new ScanCondition("ID", ScanOperator.Equal, user.ID));
            var users = await _context.ScanAsync<AppUser>(conditions).GetRemainingAsync();
            var userToEdit = users.FirstOrDefault();
            if (userToEdit != null)
            {
                userToEdit = user;
                //Save the new user  
                await _context.SaveAsync<AppUser>(userToEdit);
            }

        }
        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            List<ScanCondition> conditions = new List<ScanCondition>();
            conditions.Add(new ScanCondition("ID", ScanOperator.Contains, "USER"));
            var users = await _context.ScanAsync<AppUser>(conditions).GetRemainingAsync();
            return users;
        }

        public async Task<bool> SaveAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}