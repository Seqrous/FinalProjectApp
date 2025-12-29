using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Controllers;
using API.DTOs.Orders;
using API.DTOs.Users;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.API.Interfaces;

namespace server.API.Controllers
{

    public class OrderController : BaseApiController
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderController(IOrderRepository orderRepository, IMapper mapper)
        {
            _mapper = mapper;
            _orderRepository = orderRepository;
        }
        [HttpGet("{ID}")]
        public async Task<ActionResult<OrderDto>> GetOrderById(string id)
        {
            var orders = await _orderRepository.GetOrderById(id);
            var ordersToReturn = _mapper.Map<IEnumerable<OrderDto>>(orders);
            return Ok(ordersToReturn);
        }

        [HttpGet("{id}/orders")]
        public async Task<ActionResult<UserDto>> GetUserOrders(string id)
        {
            var orders = await _orderRepository.GetUserOrders(id);

            var ordersToReturn = _mapper.Map<IEnumerable<OrderDto>>(orders);

            return Ok(ordersToReturn);
        }
        [HttpPost("insert")]
        public async Task InsertOrder([FromBody]OrderDto orderDto)
        {
            var order = _mapper.Map<Order>(orderDto);
            var orderlines = _mapper.Map<IEnumerable<Orderline>>(orderDto.OrderLines);
            await _orderRepository.InsertOrder(order,orderlines);
        }

        /* [HttpGet("{id}")]
         public async Task<ActionResult<OrderDto>> FindOrderByID(string id)
         {
             var order = await _orderRepository.GetOrderById(id);

             var orderToReturn = _mapper.Map<OrderDto>(order);

             return Ok(orderToReturn);
         }*/

    }
}
