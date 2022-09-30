 
namespace Models
{
    public abstract class BaseModel
    {
        public Guid ID { get; set; }
        public bool HasID
        {
            get { return !(ID == Guid.Empty || ID == default(Guid)); }
        }
    }
}
