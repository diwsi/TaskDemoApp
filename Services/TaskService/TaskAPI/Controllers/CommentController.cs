using DataRepository;
using Microsoft.AspNetCore.Mvc;
using Models;
using SqlServerRepository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IRepository<Comments> commentRepository;

        public CommentController(IRepository<Comments> commentRepository)
        {
            this.commentRepository = commentRepository;
        }
         
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post([FromBody] Comments value)
        {

            if (value == null)
            {
                return BadRequest();
            }
            var resp = commentRepository.Upsert(value);
            return Ok(resp);
        }


        [HttpGet]
        public IActionResult Get([FromQuery] Dictionary<string, string> filter)
        {
            return Ok(commentRepository.List(filter));
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
            var resp = commentRepository.Delete(id);
            return Ok();
        }

    }
}
