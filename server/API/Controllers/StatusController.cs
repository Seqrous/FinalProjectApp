using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class StatusController : BaseApiController
    {

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(DateTime.UtcNow + "  Running "); 
        }
    }
}
