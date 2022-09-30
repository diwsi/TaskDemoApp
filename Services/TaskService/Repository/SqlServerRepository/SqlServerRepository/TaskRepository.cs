using DataRepository;
using Models;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Reflection.PortableExecutable;

namespace SqlServerRepository
{
    public class TaskRepository : BaseRepository, IRepository<Models.Task>
    {


        public Models.Task? Get(Guid id)
        {
            return List(new Dictionary<string, string>() { { "ID", id.ToString() } })?.FirstOrDefault();
        }

        public IEnumerable<Models.Task> List(Dictionary<string, string> listParams)
        {
            var query = @"select t.*, u.Name 
                        from dbo.Task t
                        left join dbo.[User] u on t.AssignedTo=u.ID";
            var result = new List<Models.Task>();

            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                var command = new SqlCommand(query);
                var IDFilter = listParams.FirstOrDefault(d => d.Key == "ID");
                if ( !string.IsNullOrEmpty( IDFilter.Value) )
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
                            AssignedTo = rdr.IsDBNull("AssignedTo") ? null : Guid.Parse(rdr["AssignedTo"].ToString()),
                            TaskStatus = rdr.IsDBNull("TaskStatus") ? Models.TaskStatus.Active : (Models.TaskStatus)int.Parse(rdr["TaskStatus"].ToString()),
                            TaskType = rdr.IsDBNull("TaskType") ? TaskType.TaskTypeA : (TaskType)int.Parse(rdr["TaskType"].ToString()),
                            User = rdr.IsDBNull("Name") ? null : new User() { Name = rdr["Name"].ToString() }
                        });

                    }


                }
            }
            return result;

        }

      
        public Models.Task Upsert(Models.Task model)
        {
            if (!model.HasID)
            {
                return insert(model);
            }

            return update(model);
        }

        Models.Task insert(Models.Task model)
        {
            var query = @"INSERT INTO [dbo].[Task]
           ([ID]
           ,[RequiredByDate]
           ,[Description]
           ,[TaskStatus]
           ,[TaskType]
           ,[AssignedTo]
           ,[NextActionDate])
            VALUES
           (@ID
           ,@RequiredByDate
           ,@Description
           ,@TaskStatus
           ,@TaskType
           ,@AssignedTo
           ,@NextActionDate)";
            model.ID = Guid.NewGuid();

            bindAndExecuteQuery(query, model);

            return model;

        }


        Models.Task update(Models.Task model)
        {
            var query = @"UPDATE [dbo].[Task]
            SET  
             [RequiredByDate] = @RequiredByDate
            ,[Description] = @Description
            ,[TaskStatus] =@TaskStatus
            ,[TaskType] = @TaskType
            ,[AssignedTo] = @AssignedTo
            ,[NextActionDate] =  ( select top 1 MIN(ReminderDate) from Comments where TaskID=@ID and ReminderDate>GETDATE())
        WHERE ID=@ID";

            bindAndExecuteQuery(query, model);

            return model;

        }

        public bool Delete(Guid id)
        {
            var query = @"delete FROM [TaskDemo].[dbo].[Task] where ID=@ID";
            bindAndExecuteQuery(query, new Models.Task() { ID = id });
            return true;
        }

        private int bindAndExecuteQuery(string query, Models.Task model)
        {
            var command = bindQuery(query, model);
            return Execute(command);
        }

        private SqlDataReader bindAndExecuteReader(string query, Models.Task model)
        {
            var command = bindQuery(query, model);
            return ExecuteReader(command);
        }

        private SqlCommand bindQuery(string query, Models.Task model)
        {
            var command = new SqlCommand(query);

            BindParam(command, "@ID", model.ID);
            BindParam(command, "@RequiredByDate", model.RequiredByDate);
            BindParam(command, "@Description", model.Description);
            BindParam(command, "@TaskStatus", model.TaskStatus);
            BindParam(command, "@TaskType", model.TaskType);
            BindParam(command, "@AssignedTo", model.AssignedTo);
            BindParam(command, "@NextActionDate", model.NextActionDate);
            return command;
        }


        public TaskRepository(string connectionString)
        {
            ConnectionString = connectionString;

        }
    }
}
