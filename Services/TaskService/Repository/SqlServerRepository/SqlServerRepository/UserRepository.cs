using DataRepository;
using Models;
using System.Data;
using System.Data.SqlClient;

namespace SqlServerRepository
{
    /// <summary>
    /// MSSql  user repository for 
    /// </summary>
    public class UserRepository : BaseRepository, IRepository<User>
    {
        /// <summary>
        /// list users
        /// </summary>
        /// <param name="listParams"></param>
        /// <returns></returns>
        public IEnumerable< User> List(Dictionary<string, string> listParams)
        {
            var query = @"SELECT *  FROM [dbo].[User]";
            var result = new List<User>();

            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                var command = new SqlCommand(query);
                var IDFilter = listParams.FirstOrDefault(d => d.Key == "ID");
                if (!string.IsNullOrEmpty(IDFilter.Value))
                {
                    command.CommandText += " where  ID=@ID";
                    BindParam(command, "@ID", IDFilter.Value);
                }

                connection.Open();
                using (command)
                {

                    command.Connection = connection;
                    var rdr = command.ExecuteReader();
                    while (rdr.Read())
                    {

                        result.Add(new User()
                        {
                            ID = rdr.IsDBNull("ID") ? Guid.Empty : Guid.Parse(rdr["ID"].ToString()),
                            Name = rdr.IsDBNull("Name") ? string.Empty : rdr["Name"].ToString()
                       
                        });

                    }
                     
                }
            }
            return result;

        }


        public bool Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public User? Get(Guid id)
        {
            throw new NotImplementedException();
        }
         
        public User Upsert(User model)
        {
            throw new NotImplementedException();
        }

        public UserRepository(string connectionString)
        {
            ConnectionString = connectionString;

        }
    }
}
