# Calculadora CDB

Aplicação full stack para calcular o rendimento bruto e líquido de um investimento CDB. O projeto possui uma API .NET 10 e um frontend Angular que consome essa API.

## Estrutura

- `apps/api/` — API em .NET 10 com ASP.NET Core Minimal API.
- `apps/api.Tests/` — testes automatizados da API e das regras de cálculo.
- `apps/web/` — frontend em Angular 21 com Angular Material.

## Requisitos

- .NET 10 SDK.
- Node.js compatível com Angular 21.
- npm.

## Como Executar

Instale as dependências do frontend:

```bash
cd apps/web
npm install
```

Em um terminal, suba a API a partir da raiz do repositório:

```bash
dotnet run --project apps/api/Cdb.Api.csproj
```

A API deve ficar disponível em:

```text
http://localhost:5080
```

Em outro terminal, suba o frontend:

```bash
cd apps/web
npm run start
```

Acesse a aplicação em:

```text
http://localhost:4200
```

## Uso da Aplicação

1. Abra o frontend no navegador.
2. Confira o indicador de servidor ativo no rodapé da tela.
3. Informe um valor monetário positivo.
4. Informe um prazo em meses maior que `1`.
5. Clique em “Calcular”.
6. Veja o resultado bruto e o resultado líquido retornados pela API.

## API

Endpoint de saúde usado pelo frontend:

```http
GET http://localhost:5080/health
```

Endpoint de cálculo:

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

## Observações

- O frontend usa `apps/web/src/environments/environment.ts` para configurar a URL da API.
- O frontend está em Angular 21 porque o ambiente local usado na implementacao tinha Node.js `v24.13.0`, e Angular 22 exige Node.js `v24.15.0` ou superior.
