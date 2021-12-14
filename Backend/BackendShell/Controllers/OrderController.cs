using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Projections.Order> Get()
        {
            // rewrite to use IDataProvider using dependency injection
            var data = Program.Data.Values.Select(o => new Projections.Order(o));
            return data;
        }

        // Add a Search endpoint

        // Add a Create endpoint

        // Add a Delete endpoint
    }
}