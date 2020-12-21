using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using API.Entities;
using API.Interfaces;
using server.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.API.Data
{
    public class OrderRepository : IOrderRepository
    {
        private DynamoDBContext _context;

        public OrderRepository(IAmazonDynamoDB dynamoDbClient)
        {
            if (dynamoDbClient == null) throw new ArgumentNullException(nameof(dynamoDbClient));
            _context = new DynamoDBContext(dynamoDbClient);
        }

        public async Task<Order> GetOrderById(string orderId)
        {
            var conf = new DynamoDBOperationConfig
            {
                OverrideTableName = "FinalProject",
                IndexName = "Orders"
            };
            conf.QueryFilter = new List<ScanCondition>();
            conf.QueryFilter.Add(new ScanCondition("ID", ScanOperator.Equal, orderId));

            var order = await _context.QueryAsync<Order>(orderId,conf).GetRemainingAsync();

            return order.FirstOrDefault();
        }

        public async Task<IEnumerable<Order>> GetUserOrders(string userId)
        {
            var conf = new DynamoDBOperationConfig
            {
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
