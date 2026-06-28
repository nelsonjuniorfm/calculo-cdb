# CDB API

Seed do backend em .NET 10 com ASP.NET Core Minimal API.

## Rodando localmente

```bash
dotnet run
```

API local:

- `GET /health`
- `POST /api/cdb/calculate`
- `GET /swagger`

Exemplo de payload:

```json
{
  "initialAmount": 1000,
  "months": 12
}
```

Exemplo de resposta:

```json
{
  "grossAmount": 1123.08,
  "netAmount": 1098.47
}
```
