using DataRepository;
using Models;
using System.Data;
using System.Data.SqlClient;

namespace SqlServerRepository
{
    /// <summary>
    /// MSSql repository for Comments
    /// </summary>
    public class CommentRepository : BaseRepository, IRepository<Comments>
    {

        /// <summary>
        /// load commetnts 
        /// </summary>
        /// <param name="listParams"></param>
        /// <returns></returns>
        public IEnumerable<Comments> List(Dictionary<string, string> listParams)
        {
            var query = @"SELECT *  FROM [dbo].[Comments]";
            var result = new List<Comments>();

            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                var command = new SqlCommand(query);
                var IDFilter = listParams.FirstOrDefault(d => d.Key == "TaskID");
                if (!string.IsNullOrEmpty(IDFilter.Value))
                {
                    command.CommandText += " where  TaskID=@ID";
                    BindParam(command, "@ID", IDFilter.Value);
                }

                connection.Open();
                using (command)
                {

                    command.Connection = connection;
                    var rdr = command.ExecuteReader();
                    while (rdr.Read())
                    {
                       
                        result.Add(new Comments()
                        {
                            ID = rdr.IsDBNull("ID") ? Guid.Empty : Guid.Parse(rdr["ID"].ToString()),
                            DateAdded = rdr.IsDBNull("DateAdded") ? new DateTime(): DateTime.Parse(rdr["DateAdded"].ToString()),
                            Comment  = rdr.IsDBNull("Comment") ? string.Empty : rdr["Comment"].ToString(),
                            CommentType= rdr.IsDBNull("CommentType") ? CommentType.CommentTypeA : (CommentType)int.Parse(rdr["CommentType"].ToString()),
                            ReminderDate = rdr.IsDBNull("ReminderDate") ? null : DateTime.Parse(rdr["ReminderDate"].ToString()),
                            TaskID = rdr.IsDBNull("TaskID") ? Guid.Empty : Guid.Parse(rdr["TaskID"].ToString()),
                        });

                    }
                     
                }
            }
            return result;

        }

        /// <summary>
        /// remove entity
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool Delete(Guid id)
        {
            var query = @"delete FROM  [dbo].[Comments] where ID=@ID";
            bindAndExecuteQuery(query, new Comments() { ID = id });
            return true;
        }
 
     

        Comments? IRepository<Comments>.Get(Guid id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        ///  insert or update
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Comments IRepository<Comments>.Upsert(Comments model)
        {
            if (!model.HasID)
            {
                return insert(model);
            }

            return update(model);
        }

        /// <summary>
        /// insert comment
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Comments insert(Comments model)
        {
            var query = @"INSERT INTO [dbo].[Comments]
           ([ID]
           ,[DateAdded]
           ,[Comment]
           ,[CommentType]
           ,[ReminderDate]
           ,[TaskID])
     VALUES
           (@ID
           ,@DateAdded
           ,@Comment
           ,@CommentType
           ,@ReminderDate
           ,@TaskID)";
            model.ID = Guid.NewGuid();

            bindAndExecuteQuery(query, model);

            return model;

        }

        /// <summary>
        /// update comment
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Comments update(Comments model)
        {
            var query = @"UPDATE [dbo].[Comments]
                       SET  
                           [DateAdded] = @DateAdded
                          ,[Comment] =@Comment
                          ,[CommentType] = @CommentType
                          ,[ReminderDate] = @ReminderDate
                          ,[TaskID] = @TaskID
                           WHERE ID=@ID";

            bindAndExecuteQuery(query, model);

            return model;

        }

        /// <summary>
        /// bind params and execute query
        /// </summary>
        /// <param name="query"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        private int bindAndExecuteQuery(string query, Comments model)
        {
            var command = bindQuery(query, model);
            return Execute(command);
        }

 

        /// <summary>
        /// map parameters to query
        /// </summary>
        /// <param name="query"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        private SqlCommand bindQuery(string query, Comments model)
        {
            var command = new SqlCommand(query);

            BindParam(command, "@ID", model.ID);
            BindParam(command, "@DateAdded", model.DateAdded);
            BindParam(command, "@Comment", model.Comment);
            BindParam(command, "@CommentType", model.CommentType);
            BindParam(command, "@ReminderDate", model.ReminderDate);
            BindParam(command, "@TaskID", model.TaskID);
          
            return command;
        }


        public CommentRepository(string connectionString)
        {
            ConnectionString = connectionString;

        }
    }
}
