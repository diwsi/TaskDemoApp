using DataRepository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IRepository<Models.Task> taskRepository;

        public TaskController(IRepository<Models.Task> taskRepository)
        {
            this.taskRepository = taskRepository;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public IActionResult Get([FromQuery] Dictionary<string,string> filter)
        {
            return Ok(taskRepository.List(filter));
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get(Guid id)
        {
            if (id == default(Guid))
            {
                return BadRequest();
            }
            var resp = taskRepository.Get(id);
            if(resp == null)
            {
                return NotFound();
            }
            return Ok(resp);
        }

        // POST api/<ValuesController>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult  Post([FromBody] Models.Task value)
        {

            if (value == null)
            {
                return BadRequest();
            }
            var resp =   taskRepository.Upsert(value);
            return Ok(resp);
        }
 
         
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(Guid id)
        {
            if (id == default(Guid))
            {
                return BadRequest();
            }
            var resp = taskRepository.Delete(id);
            return Ok();
        }
    }
}
