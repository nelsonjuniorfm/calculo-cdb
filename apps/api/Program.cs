using Cdb.Api.Features.Cdb;
using Cdb.Api.Features.Health;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
    {
        options.AddPolicy("DevCorsPolicy", policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddProblemDetails();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ICdbCalculator, CdbCalculator>();

var app = builder.Build();

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "CDB API v1");
        options.RoutePrefix = "swagger";
    });
}

app.UseCors("DevCorsPolicy");
app.MapHealthEndpoints();
app.MapCdbEndpoints();

await app.RunAsync();

// Expor Program para WebApplicationFactory
public partial class Program
{
    protected Program() { }
}
