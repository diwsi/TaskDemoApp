using DataRepository;
using Microsoft.AspNetCore.Mvc;
using Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskAPI.Controllers
{
    /// <summary>
    /// user api end point
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        /// <summary>
        /// data repository
        /// </summary>
        private readonly IRepository< User> userRepository;


        public UserController(IRepository< User> userRepository)
        {
            this.userRepository = userRepository;
        }

        /// <summary>
        /// list of users
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get([FromQuery] Dictionary<string,string> filter)
        {
            return Ok(userRepository.List(filter));
        }
         
        
    }
}
