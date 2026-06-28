## Backend API

Backend estabelecido em .NET 10 usando ASP.NET Core Minimal API para calcular o rendimento bruto e liquido de um investimento CDB.

## Estrutura

- `Features/Cdb/` — contrato HTTP, endpoints e regra de calculo CDB.
- `Features/Health/` — endpoint de disponibilidade da API.
- `Program.cs` — configuracao da aplicacao, Swagger, CORS de desenvolvimento e injecao de dependencias.
- `../api.Tests/` — testes automatizados da API e da regra de calculo.

## Comandos

- Build da API: `dotnet build apps/api/Cdb.Api.csproj`
- Build da solucao: `dotnet build calculo-cdb.sln`
- Executar API: `dotnet run --project apps/api/Cdb.Api.csproj`
- Testes: `dotnet test apps/api.Tests/Cdb.Api.Tests.csproj`
- Testes da solucao: `dotnet test calculo-cdb.sln`

## Endpoints

- `GET /health` — informa se a API esta ativa.
- `POST /api/cdb/calculate` — calcula resultado bruto e liquido.
- `GET /swagger` — documentacao interativa em ambiente de desenvolvimento.

## Testes

- Use xUnit para testes.
- Cubra regras de calculo em `CdbCalculatorTests`.
- Cubra contratos HTTP e validacoes em testes de endpoint com `WebApplicationFactory`.
- Ao alterar contratos, atualize os testes e os READMEs que documentam payloads e respostas.

## Convencoes

- Mantenha endpoints agrupados por feature.
- Nao adicione pacotes externos sem confirmacao.
- Prefira tipos explicitos para contratos HTTP.
- Mantenha mensagens de validacao claras para consumo pelo frontend.
