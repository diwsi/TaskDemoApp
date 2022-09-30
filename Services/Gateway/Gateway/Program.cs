using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Values;
///// This is a Gateway for microservice purposes
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("configuration.json");
builder.Services.AddCors();
builder.Services.AddOcelot();
  
var app = builder.Build();
app.UseCors(x => x
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .SetIsOriginAllowed(origin => true)  
                  .AllowCredentials());
app.UseOcelot().Wait();
  
app.Run();

internal record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}