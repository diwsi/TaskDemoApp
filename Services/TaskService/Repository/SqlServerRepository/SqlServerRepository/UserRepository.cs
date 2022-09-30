using DataRepository;
using Models;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Reflection.PortableExecutable;

namespace SqlServerRepository
{
    public class UserRepository : BaseRepository, IRepository<Models.User>
    {
        public IEnumerable< User> List(Dictionary<string, string> listParams)
        {
            var query = @"SELECT *  FROM [dbo].[User]";
            var result = new List<>();

            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                var command = new SqlCommand(query);
                var IDFilter = listParams.FirstOrDefault(d => d.Key == "ID");
                if (!string.IsNullOrEmpty(IDFilter.Value))
                {
                    command.CommandText += " where t.ID=@ID";
                    BindParam(command, "@ID", IDFilter.Value);
                }

                connection.Open();
                using (command)
                {

                    command.Connection = connection;
                    var rdr = command.ExecuteReader();
                    while (rdr.Read())
                    {

                        result.Add(new Models.Task()
                        {
                            ID = rdr.IsDBNull("ID") ? Guid.Empty : Guid.Parse(rdr["ID"].ToString()),
                            Description = rdr.IsDBNull("Description") ? string.Empty : rdr["Description"].ToString(),
                            NextActionDate = rdr.IsDBNull("NextActionDate") ? null : DateTime.Parse(rdr["NextActionDate"].ToString()),
                            RequiredByDate = rdr.IsDBNull("RequiredByDate") ? null : DateTime.Parse(rdr["RequiredByDate"].ToString()),
                            TaskStatus = rdr.IsDBNull("TaskStatus") ? Models.TaskStatus.Active : (Models.TaskStatus)int.Parse(rdr["TaskStatus"].ToString()),
                            TaskType = rdr.IsDBNull("TaskType") ? TaskType.TaskTypeA : (TaskType)int.Parse(rdr["TaskType"].ToString()),
                            User = rdr.IsDBNull("Name") ? null : new User() { Name = rdr["Name"].ToString() }
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
    }
}
