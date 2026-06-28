namespace Cdb.Api.Features.Cdb;

public sealed record CdbCalculationResponse(
    decimal GrossAmount,
    decimal NetAmount);
