# Plano: Implementação do Cálculo CDB

## Tarefa 1: Implementar Regra de Cálculo e Contrato da API

### Objetivo

Implementar o cálculo oficial do investimento CDB na API, retornando somente:

- `grossAmount`: Resultado Bruto
- `netAmount`: Resultado Líquido

### Implementação

- Ajustar `CdbCalculationResponse` para conter apenas:
  - `GrossAmount`
  - `NetAmount`
- Manter validações:
  - `InitialAmount > 0`
  - `Months > 1`
- Consolidar o cálculo em componentes simples:
  - `ICdbCalculator`
  - `CdbCalculator`
- Aplicar SOLID sem over engineering:
  - separar cálculo, validação HTTP e contratos;
  - depender de abstração apenas onde facilitar teste/desacoplamento;
  - evitar camadas artificiais.
- Usar constantes:
  - `CDI = 0.009m`
  - `TB = 1.08m`
- Aplicar a fórmula mês a mês:
  - `VF = VI x [1 + (CDI x TB)]`
  - o resultado de um mês deve ser usado como base do mês seguinte.
- Calcular imposto sobre o rendimento:
  - `grossAmount - initialAmount`
- Aplicar alíquotas:
  - até 6 meses: `22.5%`
  - até 12 meses: `20%`
  - até 24 meses: `17.5%`
  - acima de 24 meses: `15%`
- Arredondar somente no retorno final, com 2 casas decimais.
- Atualizar Swagger para refletir o contrato final.

### Validação

```bash
dotnet build apps/api/Cdb.Api.csproj
```

## Tarefa 2: Criar Testes Unitários e Garantir Cobertura

### Objetivo

Criar testes automatizados para validar as regras de cálculo e manter cobertura acima de `90%`.

### Implementação

- Criar projeto `apps/api.Tests`.
- Usar:
  - xUnit
  - NSubstitute
  - coverlet collector
- Adicionar o projeto de testes à solution `calculo-cdb.sln`.

### Cenários de teste

- Cálculo bruto aplica rendimento composto mensal corretamente.
- Resultado líquido desconta imposto somente sobre rendimento.
- Faixas de imposto:
  - 2 a 6 meses: `22.5%`
  - 7 a 12 meses: `20%`
  - 13 a 24 meses: `17.5%`
  - acima de 24 meses: `15%`
- Entrada inválida:
  - valor inicial zero ou negativo retorna `400`
  - prazo menor que 2 retorna `400`
- Endpoint retorna `200` com contrato esperado quando entrada é válida.
- Endpoint usa `ICdbCalculator`, permitindo substituição com NSubstitute.

### Validação

```bash
dotnet test apps/api.Tests/Cdb.Api.Tests.csproj --collect:"XPlat Code Coverage"
```

Meta obrigatória:

```text
Cobertura acima de 90%
```

## Assumptions

- O retorno público da API deve conter somente Resultado Bruto e Resultado Líquido.
- Arredondamento monetário será feito apenas no final do cálculo.
- Os pacotes xUnit, NSubstitute e coverlet collector estão autorizados por requisito.
- SOLID deve ser aplicado como diretriz prática, sem criar abstrações desnecessárias.
- A qualidade exigida é build sem warnings relevantes e sem violações óbvias de análise nativa/SonarLint.
