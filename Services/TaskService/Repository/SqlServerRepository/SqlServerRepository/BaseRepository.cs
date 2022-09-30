using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SqlServerRepository
{
    /// <summary>
    /// Base repository for common functions.
    /// </summary>
    public class BaseRepository
    {
        /// <summary>
        /// DB con string
        /// </summary>
        public string? ConnectionString { get; set; }
         
        /// <summary>
        /// Send command to db
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        public  int  Execute(SqlCommand command)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using (command)
                {
                    command.Connection = connection;
                    var r = command.ExecuteNonQuery();
                    return r; 

                }
            }
        }


        /// <summary>
        /// Bind query params if available
        /// </summary>
        /// <param name="command"></param>
        /// <param name="parameter"></param>
        /// <param name="value"></param>
        public void BindParam(SqlCommand command, string parameter, object? value)
        {
            if (command.CommandText.Contains(parameter))
            {
                command.Parameters.AddWithValue(parameter, value ?? DBNull.Value);
            }
        }


        
    }
}
