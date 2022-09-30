using DataRepository;
using SqlServerRepository;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connString = builder.Configuration["ConnectionString"];
builder.Services.AddScoped<IRepository<Models.Task>, TaskRepository>(sp =>
{    
    return new TaskRepository(connString);
});
builder.Services.AddScoped<IRepository<Models.User>, UserRepository>(sp =>
{
    return new UserRepository(connString);
});
builder.Services.AddScoped<IRepository<Models.Comments>, CommentRepository>(sp =>
{
    return new CommentRepository(connString);
});
// Add services to the container.

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(x => x
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .SetIsOriginAllowed(origin => true)
                  .AllowCredentials());
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.Run();

internal record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}