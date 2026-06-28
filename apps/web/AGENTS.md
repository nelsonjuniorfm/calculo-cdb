## Frontend Web

Frontend em Angular (TypeScript) para a calculadora de rendimento CDB.

## Tecnologias e Configurações

- **Framework**: Angular 22
- **Linguagem**: TypeScript
- **Testes**: Suíte de testes nativa (Jasmine/Karma)
- **Biblioteca de Componentes**: Angular Material (Material Design)
- **Gerenciador de Pacotes**: npm

## Comandos Recomendados

- **Criação do projeto**: `npx -y @angular/cli@latest new web --directory=apps/web --routing=false --style=css --ssr=false`
- **Adicionar Angular Material**: `ng add @angular/material`
- **Executar localmente**: `npm run start` ou `ng serve`
- **Executar testes**: `npm run test` ou `npm test`
- **Linting**: `npm run lint`
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

### 4. Testes com Jasmine/Karma
- Escreva testes unitários simples para validar a lógica de cálculo do componente e o tratamento de respostas do serviço HTTP usando a suíte nativa do Angular.
