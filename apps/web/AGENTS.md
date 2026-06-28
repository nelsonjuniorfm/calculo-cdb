## Frontend Web

Frontend em Angular (TypeScript) para a calculadora de rendimento CDB.

## Tecnologias e Configurações

- **Framework**: Angular 21
- **Linguagem**: TypeScript
- **Testes**: Suíte nativa gerada pelo Angular CLI 21 com Vitest
- **Biblioteca de Componentes**: Angular Material (Material Design)
- **Gerenciador de Pacotes**: npm

### Versão do Angular

O projeto usa Angular 21 porque o ambiente local possui Node.js `v24.13.0`, enquanto o Angular CLI 22 exige Node.js `v24.15.0` ou superior. Ao atualizar o Node para uma versao compativel, a migracao para Angular 22 pode ser avaliada em uma tarefa separada.

## Comandos Recomendados

- **Executar localmente**: `npm run start`
- **Executar testes**: `npm test -- --watch=false` ou `npm test`
- **Build**: `npm run build`
- **Linting**: nao ha script de lint configurado atualmente

## Configuração

- A URL da API fica em `src/environments/environment.ts`.
- O host local da API deve ser `http://localhost:5080`.
- Nao crie nem altere arquivos `.env` ou `.env.*`; o projeto usa `environment.ts`, que e o padrao do Angular para configuracao por ambiente.

## Comandos de Referência

- **Criação do projeto**: `npx -y @angular/cli@21 new web --directory=apps/web --routing=false --style=css --ssr=false`
- **Adicionar Angular Material**: `npx ng add @angular/material`
- **Executar localmente**: `npm run start` ou `ng serve`
- **Executar testes**: `npm test -- --watch=false`
- **Build**: `npm run build`

## Diretrizes de Desenvolvimento (Guideline Simplificado)

Para manter o projeto simples, direto e de fácil manutenção, siga estas diretrizes:

### 1. Estrutura do Projeto
Como a aplicação possui apenas uma única funcionalidade, utilize componentes autônomos (**Standalone Components**).
- `src/app/components/` — Componentes standalone para o formulário, exibição de resultados e indicador de status.
- `src/app/services/` — Serviço `CdbService` para comunicação com a API.
- `src/app/models/` — Interfaces/Tipos TypeScript para os dados de entrada e saída.

### 2. Estilo e Design System (Material Design)
- Use componentes e estilos do **Angular Material** para garantir um visual limpo, moderno e profissional, aderente ao Material Design.
- Alinhe a disposição dos componentes ao comportamento definido no [wireframe](file:///home/nelson-fernandes/learning/calculo-cdb/apps/web/wireframe/wireframe-calculo-cdb.png).
- Utilize componentes como `mat-card`, `mat-form-field`, `mat-input`, `mat-button` e ícones para feedback visual.

### 3. Integração com a API
- O frontend deve fazer uma chamada inicial ao endpoint `GET /health` do backend para atualizar o indicador de status do servidor (Ativo/Inativo) utilizando o componente visual adequado.
- Tratar cenários onde o backend está offline ou retorna erro de validação (ex: 400 Bad Request), exibindo a mensagem retornada pelo servidor de forma clara.

### 4. Testes com Vitest
- Escreva testes unitarios simples para validar o formulario, a renderizacao dos resultados, a chamada inicial ao `/health` e o tratamento de respostas do servico HTTP usando a suite nativa gerada pelo Angular CLI 21.
