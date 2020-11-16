﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
