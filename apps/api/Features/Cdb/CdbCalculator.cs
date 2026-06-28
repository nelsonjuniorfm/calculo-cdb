namespace Cdb.Api.Features.Cdb;

public sealed class CdbCalculator : ICdbCalculator
{
    private const decimal CdiRate = 0.009m;
    private const decimal BankRate = 1.08m;
    private const int CurrencyDecimalPlaces = 2;

    public CdbCalculationResponse Calculate(decimal initialAmount, int months)
    {
        var grossAmount = initialAmount;

        for (var month = 0; month < months; month++)
        {
            grossAmount *= 1 + CdiRate * BankRate;
        }

        var grossProfit = grossAmount - initialAmount;
        var taxRate = GetTaxRate(months);
        var taxAmount = grossProfit * taxRate;
        var netAmount = grossAmount - taxAmount;

        return new CdbCalculationResponse(
            RoundCurrency(grossAmount),
            RoundCurrency(netAmount));
    }

    private static decimal GetTaxRate(int months)
    {
        return months switch
        {
            <= 6 => 0.225m,
            <= 12 => 0.20m,
            <= 24 => 0.175m,
            _ => 0.15m
        };
    }

    private static decimal RoundCurrency(decimal amount)
    {
        return decimal.Round(amount, CurrencyDecimalPlaces, MidpointRounding.ToEven);
    }
}
