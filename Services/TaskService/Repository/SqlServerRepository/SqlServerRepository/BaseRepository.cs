using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SqlServerRepository
{
    public class BaseRepository
    {
        public string? ConnectionString { get; set; }



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

        public SqlDataReader ExecuteReader(SqlCommand command)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using (command)
                {
                    command.Connection = connection;
                    return command.ExecuteReader();
                     

                }
            }
        }

        public void BindParam(SqlCommand command, string parameter, object? value)
        {
            if (command.CommandText.Contains(parameter))
            {
                command.Parameters.AddWithValue(parameter, value ?? DBNull.Value);
            }
        }


        
    }
}
