 

namespace Models
{
    public class Task: BaseModel
    {
        public DateTime CreatedDate { get; set; }
        public DateTime? RequiredByDate { get; set; }
        public string? Description { get; set; }
        public TaskStatus TaskStatus { get; set; }
        public TaskType TaskType { get; set; }
        public User? User { get; set; }
        public DateTime? NextActionDate { get; set; }

        public Task()
        {
            CreatedDate = DateTime.Now;
        }
    }
}
