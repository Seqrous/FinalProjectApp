using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs.Orders;
using API.DTOs.Users;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();

            var usersToReturn = _mapper.Map<IEnumerable<UserDto>>(users);

            return Ok(usersToReturn);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(string id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            var userToReturn = _mapper.Map<UserDto>(user);

            return Ok(userToReturn);
        }

        [HttpGet("{id}/orders")]
        public async Task<ActionResult<UserDto>> GetUserOrders(string id)
        {
            var orders = await _userRepository.GetUserOrders(id);

            var ordersToReturn = _mapper.Map<IEnumerable<OrderDto>>(orders);

            return Ok(ordersToReturn);
        }
    }
}