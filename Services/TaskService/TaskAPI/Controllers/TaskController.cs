using DataRepository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskAPI.Controllers
{
    /// <summary>
    /// Endpoint for task entity
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        /// <summary>
        /// data repository
        /// </summary>
        private readonly IRepository<Models.Task> taskRepository;

        public TaskController(IRepository<Models.Task> taskRepository)
        {
            this.taskRepository = taskRepository;
        }
        
        /// <summary>
        /// list all tasks
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get([FromQuery] Dictionary<string,string> filter)
        {
            return Ok(taskRepository.List(filter));
        }

      /// <summary>
      /// load spesific task 
      /// </summary>
      /// <param name="id"></param>
      /// <returns></returns>
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

      /// <summary>
      /// save entity
      /// </summary>
      /// <param name="value"></param>
      /// <returns></returns>
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
 
      
        /// <summary>
        /// Remove Entiy
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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
