using DataRepository;
using SqlServerRepository;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
 
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IRepository<Models.Task>, TaskRepository>(sp =>
{
    
    return new TaskRepository(builder.Configuration["ConnectionString"]);
});
// Add services to the container.

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.Run();

internal record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}