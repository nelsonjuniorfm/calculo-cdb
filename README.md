# Calculadora CDB

Aplicacao full stack para calcular o rendimento bruto e liquido de um investimento CDB. O projeto possui uma API .NET 10 e um frontend Angular que consome essa API.

## Estrutura

- `apps/api/` — API em .NET 10 com ASP.NET Core Minimal API.
- `apps/api.Tests/` — testes automatizados da API e das regras de calculo.
- `apps/web/` — frontend em Angular 21 com Angular Material.

## Requisitos

- .NET 10 SDK.
- Node.js compativel com Angular 21.
- npm.

## Como Executar

Instale as dependencias do frontend:

```bash
cd apps/web
npm install
```

Em um terminal, suba a API a partir da raiz do repositorio:

```bash
dotnet run --project apps/api/Cdb.Api.csproj
```

A API deve ficar disponivel em:

```text
http://localhost:5080
```

Em outro terminal, suba o frontend:

```bash
cd apps/web
npm run start
```

Acesse a aplicacao em:

```text
http://localhost:4200
```

## Uso da Aplicacao

1. Abra o frontend no navegador.
2. Confira o indicador de servidor ativo no rodape da tela.
3. Informe um valor monetario positivo.
4. Informe um prazo em meses maior que `1`.
5. Clique em “Calcular”.
6. Veja o resultado bruto e o resultado liquido retornados pela API.

## API

Endpoint de saude usado pelo frontend:

```http
GET http://localhost:5080/health
```

Endpoint de calculo:

```http
POST http://localhost:5080/api/cdb/calculate
```

Payload:

```json
{
  "initialAmount": 1000,
  "months": 12
}
```

Resposta:

```json
{
  "grossAmount": 1123.08,
  "netAmount": 1098.47
}
```

Swagger da API em desenvolvimento:

```text
http://localhost:5080/swagger
```

## Testes e Build

Backend:

```bash
dotnet test apps/api.Tests/Cdb.Api.Tests.csproj
dotnet build calculo-cdb.sln
```

Frontend:

```bash
cd apps/web
npm test -- --watch=false
npm run build
```

## Observacoes

- O frontend usa `apps/web/src/environments/environment.ts` para configurar a URL da API.
- Nao e necessario criar `.env`; o repositorio proibe criar ou alterar arquivos `.env` e `.env.*`.
- O frontend esta em Angular 21 porque o ambiente local usado na implementacao tinha Node.js `v24.13.0`, e Angular 22 exige Node.js `v24.15.0` ou superior.
