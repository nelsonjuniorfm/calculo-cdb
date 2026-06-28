using Cdb.Api.Features.Cdb;

namespace Cdb.Api.Tests;

public sealed class CdbCalculatorTests
{
    private readonly CdbCalculator _calculator = new();

    [Theory]
    [InlineData(1000, 2, 1019.53)]
    [InlineData(1000, 6, 1059.76)]
    [InlineData(1000, 12, 1123.08)]
    [InlineData(1000, 24, 1261.31)]
    [InlineData(1000, 25, 1273.57)]
    public void Calculate_ReturnsGrossAmountWithMonthlyCompoundInterest(
        decimal initialAmount,
        int months,
        decimal expectedGrossAmount)
    {
        var result = _calculator.Calculate(initialAmount, months);

        Assert.Equal(expectedGrossAmount, result.GrossAmount);
    }

    [Theory]
    [InlineData(1000, 2, 1015.14)]
    [InlineData(1000, 6, 1046.31)]
    [InlineData(1000, 12, 1098.47)]
    [InlineData(1000, 24, 1215.58)]
    [InlineData(1000, 25, 1232.54)]
    public void Calculate_ReturnsNetAmountWithTaxAppliedOnlyToProfit(
        decimal initialAmount,
        int months,
        decimal expectedNetAmount)
    {
        var result = _calculator.Calculate(initialAmount, months);

        Assert.Equal(expectedNetAmount, result.NetAmount);
    }
}
