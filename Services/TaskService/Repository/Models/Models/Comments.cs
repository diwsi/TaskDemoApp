 
namespace Models
{
    public class Comments:BaseModel
    {
        public DateTime DateAdded { get; set; } 
        public string? Comment { get; set; }
        public CommentType CommentType { get; set; }
        public DateTime? ReminderDate { get; set; }

        public Comments()
        {
            DateAdded = DateTime.Now;
        }
    }
}
