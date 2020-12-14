using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IDynamoDBContext _context;
        public AccountController(ITokenService tokenService, IDynamoDBContext context)
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
                ID = "USER-" + Guid.NewGuid().ToString(),
                Email = registerDto.Email,
                Sort = registerDto.Name,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key

            };
            await _context.SaveAsync(user);

            // Save to the database

            return new AuthenticationDto
            {
                Id = user.ID,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationDto>> Login(LoginDto loginDto)
        {
            var conf = new DynamoDBOperationConfig
            {
                OverrideTableName = "FinalProject",
                IndexName = "Users"
            };
            
            var users = await _context.QueryAsync<AppUser>(loginDto.Email,conf).GetRemainingAsync();
            var user = users.FirstOrDefault();

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
                Id = user.ID,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string email)
        {
            var conf = new DynamoDBOperationConfig
            {
                OverrideTableName = "FinalProject",
                IndexName = "Users"
            };
            List<ScanCondition> conditions = new List<ScanCondition>();
            conditions.Add(new ScanCondition("Email", ScanOperator.Equal, email));
            var users = await _context.ScanAsync<AppUser>(conditions, conf).GetRemainingAsync();
            if (users.Count == 0) return false; else return true;
            
        }
    }
}