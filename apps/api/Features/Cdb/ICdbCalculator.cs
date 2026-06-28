namespace Cdb.Api.Features.Cdb;

public interface ICdbCalculator
{
    CdbCalculationResponse Calculate(decimal initialAmount, int months);
}
