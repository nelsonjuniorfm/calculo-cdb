# CDB API

API em .NET 10 com ASP.NET Core Minimal API para calcular o resultado bruto e liquido de um investimento CDB.

## Objetivo

Receber um valor inicial e um prazo em meses, validar os dados de entrada e retornar o rendimento calculado. A API tambem oferece um endpoint de saude usado pelo frontend para indicar se o servidor esta ativo.

## Requisitos

- .NET 10 SDK.

## Como Rodar

Na raiz do repositorio:

```bash
dotnet run --project apps/api/Cdb.Api.csproj
```

A API ficara disponivel em:

```text
http://localhost:5080
```

Em ambiente de desenvolvimento, a documentacao Swagger fica em:

```text
http://localhost:5080/swagger
```

## Endpoints

### Health

```http
GET /health
```

Resposta:

```json
{
  "status": "Healthy"
}
```

### Calcular CDB

```http
POST /api/cdb/calculate
```

Payload:

```json
{
  "initialAmount": 1000,
  "months": 12
}
```

Resposta de sucesso:

```json
{
  "grossAmount": 1123.08,
  "netAmount": 1098.47
}
```

Resposta de validacao:

```json
{
  "message": "O prazo deve ser de pelo menos 2 meses."
}
```

## Validacoes

- `initialAmount` deve ser maior que zero.
- `months` deve ser maior que `1`.

## Testes e Build

Rodar testes:

```bash
dotnet test apps/api.Tests/Cdb.Api.Tests.csproj
```

Build da solucao:

```bash
dotnet build calculo-cdb.sln
```
