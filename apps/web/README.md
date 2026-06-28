# Frontend Web - Calculadora CDB

Aplicacao Angular para calcular o rendimento bruto e liquido de um investimento CDB. A interface segue o wireframe do projeto, valida os dados de entrada e consome a API local para obter os resultados.

## Requisitos

- Node.js compativel com Angular 21.
- npm.
- API do projeto rodando em `http://localhost:5080`.

## Configuracao da API

O host da API esta centralizado em:

```ts
src/environments/environment.ts
```

Valor esperado para desenvolvimento local:

```ts
apiBaseUrl: 'http://localhost:5080'
```

O projeto nao usa `.env`, pois Angular usa arquivos `environment.ts` como padrao de configuracao por ambiente.

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Suba a API em outro terminal:

```bash
dotnet run --project ../api/Cdb.Api.csproj
```

Inicie o frontend:

```bash
npm run start
```

Acesse:

```text
http://localhost:4200
```

## Funcionalidades

- Consulta `GET /health` ao abrir a tela para indicar se o servidor esta ativo.
- Envia `POST /api/cdb/calculate` para calcular o rendimento.
- Valida valor monetario positivo.
- Valida prazo em meses maior que `1`.
- Exibe resultado bruto e resultado liquido.
- Exibe mensagens de erro quando a API retorna validacao ou esta indisponivel.

## Testes e Build

Rodar testes:

```bash
npm test -- --watch=false
```

Gerar build:

```bash
npm run build
```

Nao ha script de lint configurado atualmente.
