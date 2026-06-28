namespace Cdb.Api.Features.Cdb;

public static class CdbEndpoints
{
    public static IEndpointRouteBuilder MapCdbEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/cdb")
            .WithTags("CDB");

        group.MapPost("/calculate", Calculate)
            .WithName("CalculateCdb")
            .Accepts<CdbCalculationRequest>("application/json")
            .Produces<CdbCalculationResponse>()
            .Produces<ErrorResponse>(StatusCodes.Status400BadRequest);

        return app;
    }

    private static IResult Calculate(CdbCalculationRequest request, ICdbCalculator calculator)
    {
        if (request.InitialAmount <= 0)
        {
            return Results.BadRequest(new ErrorResponse("O valor inicial deve ser maior que zero."));
        }

        if (request.Months < 2)
        {
            return Results.BadRequest(new ErrorResponse("O prazo deve ser de pelo menos 2 meses."));
        }

        var result = calculator.Calculate(request.InitialAmount, request.Months);

        return Results.Ok(result);
    }
}
