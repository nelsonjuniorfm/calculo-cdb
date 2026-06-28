namespace Cdb.Api.Features.Health;

public static class HealthEndpoints
{
    public static IEndpointRouteBuilder MapHealthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/health", () => Results.Ok(new HealthResponse("Healthy")))
            .WithName("HealthCheck")
            .WithTags("Health")
            .Produces<HealthResponse>();

        return app;
    }
}
