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
                
        public async Task<IEnumerable<Order>> GetOrderById(string orderId)
        {
            var orders = await _context.QueryAsync<Order>(orderId).GetRemainingAsync();
            return orders;
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
        
        public async Task InsertOrder(Order order,IEnumerable<Orderline> orderlines)
        {
            TimeSpan t = DateTime.Now - new DateTime(1970, 1, 1);
            int secondsSinceEpoch = (int)t.TotalSeconds;


            order.ID = "ORDER-" + Guid.NewGuid().ToString();
            order.PaymentDate = secondsSinceEpoch;
            await _context.SaveAsync<Order>(order);

            foreach (Orderline orderline in orderlines)
            {
                orderline.ID = order.ID;
                await _context.SaveAsync(orderline);
            }  
        }
    }
}
