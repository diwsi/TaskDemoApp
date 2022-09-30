using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataRepository
{
    /// <summary>
    /// Generc form of repository
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepository<T> where T : class
    {
        public T? Get(Guid id);
        T Upsert(T model);
        bool Delete(Guid id);
        public IEnumerable<T> List(Dictionary<string, string> listParams);
        

    }
}
