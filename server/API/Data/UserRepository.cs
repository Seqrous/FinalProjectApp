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
            var conf = new DynamoDBOperationConfig
            {
                OverrideTableName = "FinalProject",
                IndexName = "Users"
            };

            conf.QueryFilter = new List<ScanCondition>();
            conf.QueryFilter.Add(new ScanCondition("ID", ScanOperator.Equal, id));

            var users = await _context.QueryAsync<AppUser>(id, conf).GetRemainingAsync();
            var user = users.FirstOrDefault();

            return user;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            throw new NotImplementedException();
        }

        public void Update(AppUser user)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Order>> GetUserOrders(string userId)
        {
            var conf = new DynamoDBOperationConfig {
                OverrideTableName = "FinalProject",
                IndexName = "Invoices"
            };

            conf.QueryFilter = new List<ScanCondition>();   
            conf.QueryFilter.Add(new ScanCondition("PaymentDate", ScanOperator.GreaterThanOrEqual, (long)1));

            var orders = await _context.QueryAsync<Order>(userId, conf).GetRemainingAsync();

            return orders;
        }
    }
}