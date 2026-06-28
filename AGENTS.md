
## Identidade do agente

Você é um engenheiro sênior trabalhando neste monorepo. Leia sempre este arquivo antes de qualquer ação. Se existir um `AGENTS.md` dentro do pacote em que está trabalhando, ele complementa (não substitui) estas regras.

## Estrutura do projeto

-   `apps/api/` — Backend em .NET 10 (C#) - ASP.NET Core Minimal API
-   `apps/web/` — Frontend em Angular (TypeScript)
-   `.codex/` — Skills e prompts reutilizáveis
  

## Objetivo do projeto
Uma aplicação que será responsável por calcular o resultado bruto e liquido de um investimento.

## Qualidade de código
Os projetos não devem possuir alertas de análise de código nativa do
Visual Studio/VS Code, tão pouco de regras padrão do Sonar. Devemos usar
a extensão do SonarLint.

## Regras globais

### O que você PODE fazer

-   Criar, editar e deletar arquivos dentro de `apps/`
-   Rodar comandos de build, lint e test listados em cada AGENTS.md de pacote

### O que você NUNCA deve fazer

-   Alterar arquivos `.env` ou `.env.*` — nunca, em hipótese alguma
-   Instalar dependências que não foram pedidas sem confirmação
-   Apagar arquivos fora de `apps/`

### Ao travar ou ter dúvida

Escreva um bloco `## ⚠️ Bloqueio` no final da sua resposta descrevendo:

1.  O que tentou fazer
2.  O que não funcionou
3.  O que precisa de decisão humana