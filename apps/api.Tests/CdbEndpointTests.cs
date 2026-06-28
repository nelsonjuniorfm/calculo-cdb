using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Cdb.Api.Features.Cdb;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using NSubstitute;

namespace Cdb.Api.Tests;

public sealed class CdbEndpointTests
{
    [Theory]
    [InlineData(0, 2)]
    [InlineData(-1, 2)]
    [InlineData(1000, 1)]
    public async Task Calculate_ReturnsBadRequest_WhenRequestIsInvalid(decimal initialAmount, int months)
    {
        await using var factory = new WebApplicationFactory<Program>();
        using var client = factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/cdb/calculate", new CdbCalculationRequest(initialAmount, months));

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Calculate_ReturnsOnlyGrossAndNetAmounts_WhenRequestIsValid()
    {
        await using var factory = new WebApplicationFactory<Program>();
        using var client = factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/cdb/calculate", new CdbCalculationRequest(1000, 12));
        var content = await response.Content.ReadAsStringAsync();
        using var json = JsonDocument.Parse(content);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True(json.RootElement.TryGetProperty("grossAmount", out var grossAmount));
        Assert.True(json.RootElement.TryGetProperty("netAmount", out var netAmount));
        Assert.Equal(1123.08m, grossAmount.GetDecimal());
        Assert.Equal(1098.47m, netAmount.GetDecimal());
        Assert.Equal(2, json.RootElement.EnumerateObject().Count());
    }

    [Fact]
    public async Task Calculate_UsesCalculatorAbstraction_WhenRequestIsValid()
    {
        var calculator = Substitute.For<ICdbCalculator>();
        calculator.Calculate(2500, 8).Returns(new CdbCalculationResponse(2701.23m, 2650.99m));

        await using var factory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    services.RemoveAll<ICdbCalculator>();
                    services.AddSingleton(calculator);
                });
            });
        using var client = factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/cdb/calculate", new CdbCalculationRequest(2500, 8));
        var result = await response.Content.ReadFromJsonAsync<CdbCalculationResponse>();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(result);
        Assert.Equal(2701.23m, result.GrossAmount);
        Assert.Equal(2650.99m, result.NetAmount);
        calculator.Received(1).Calculate(2500, 8);
    }
}
