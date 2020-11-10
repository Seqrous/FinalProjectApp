using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            this._tokenService = tokenService;
            this._context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticationDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email)) return BadRequest("Email is taken");

            // Hash for password encryption
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                // Encrypt the password and save the hash key
                Email = registerDto.Email,
                Name = registerDto.Name,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            // Save to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new AuthenticationDto
            {
                Id = user.Id,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationDto>> Login(LoginDto loginDto)
        {
            // Get the user with the matching email
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("Invalid email");

            // Get the same hash used for encrypting password during registration
            using var hmac = new HMACSHA512(user.PasswordSalt);

            // Hash the password for validation
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new AuthenticationDto
            {
                Id = user.Id,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }
    }
}