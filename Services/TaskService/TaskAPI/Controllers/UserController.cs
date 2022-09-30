using DataRepository;
using Microsoft.AspNetCore.Mvc;
using Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository< User> userRepository;

        public UserController(IRepository< User> userRepository)
        {
            this.userRepository = userRepository;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public IActionResult Get([FromQuery] Dictionary<string,string> filter)
        {
            return Ok(userRepository.List(filter));
        }
         
        
    }
}
