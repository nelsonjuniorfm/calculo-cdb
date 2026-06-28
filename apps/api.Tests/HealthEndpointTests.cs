using System.Net;
using System.Net.Http.Json;
using Cdb.Api.Features.Health;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Cdb.Api.Tests;

public sealed class HealthEndpointTests
{
    [Fact]
    public async Task Health_ReturnsHealthyStatus()
    {
        await using var factory = new WebApplicationFactory<Program>();
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/health");
        var result = await response.Content.ReadFromJsonAsync<HealthResponse>();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(result);
        Assert.Equal("Healthy", result.Status);
    }
}
