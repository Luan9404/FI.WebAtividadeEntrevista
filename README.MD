# FI.WebAtividadeEntrevista

## Objetivo
Implementar melhorias no sistema `FI.WebAtividadeEntrevista` para avaliação técnica.

---

### Funcionalidades

#### Cadastro de Cliente

- **Campo CPF**:
  - Adição do campo **CPF** na tela de cadastro/alteração de clientes.
  - O CPF é **obrigatório** e deve ser **único** (não permite duplicação no banco de dados).
  - O CPF segue o formato **999.999.999-99** e é validado pelo algoritmo de verificação do dígito verificador do CPF.
  - Caso o CPF já exista no banco, o sistema exibirá uma mensagem de erro.

#### Modal de Beneficiários

- **Beneficiários**: Na tela de cadastro/alteração de clientes, foi adicionado um botão para **inclusão, edição e exclusão de beneficiários**.
- Cada **beneficiário** possui os campos: **Nome** e **CPF**.
- O sistema realiza a validação de CPF para garantir que o mesmo não seja duplicado para o **mesmo cliente**.
- O beneficiário é **salvo na base de dados** quando o botão "Salvar" for acionado na tela de "Cadastrar Cliente".


### Banco de Dados

- **Tabela CLIENTES**:
  - Foi adicionado o campo **CPF** na tabela `CLIENTES`.
  
- **Tabela BENEFICIARIOS**:
  - Foi criada a tabela `BENEFICIARIOS` para armazenar os dados dos beneficiários com os campos:
    - `ID`
    - `CPF`
    - `NOME`
    - `IDCLIENTE` (chave estrangeira para a tabela `CLIENTES`)

 O banco de dados é armazenado localmente na pasta `App_Data`, com o arquivo `BancoDeDados.mdf`.

---

## Requisitos para execução
- Visual Studio 2022 (Community aceita)
- .NET Framework 4.8
- SQL Server Express 2019 LocalDB  
- Solution: Baixe o repositorio como .zip.

---

## Execução
1. Abrir a solution no Visual Studio.
2. Restaurar pacotes, compilar e executar.
3. Realizar os testes na aba **Clientes**.

