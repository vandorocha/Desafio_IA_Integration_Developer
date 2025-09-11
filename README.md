# Projeto: Menu Interativo de Clientes com IA

Este projeto é um **simulador de URA (Unidade de Resposta Audível) interativa**, que busca dados de clientes de uma API fictícia e permite gerar diferentes formatos de saída, com integração opcional à IA da OpenAI (GPT) para complementos de informações e resumos. O projeto roda em Node.js e fornece interação via terminal e via endpoint HTTP (`/webhook`).

## Funcionalidades

* Busca dados de clientes de `https://jsonplaceholder.typicode.com/users`.
* Gera saídas em diversos formatos:

  * Detalhes completos do cliente.
  * Resumos amigáveis e divertidos.
  * Informações da empresa.
  * Resumo com hobbies fictícios.
* Suporta integração com OpenAI GPT para gerar textos complementares.
* Simula cenários de troubleshooting (API fora do ar, autenticação falha, JSON inválido).
* Menu interativo no terminal para testar as funcionalidades sem precisar de frontend.

## Pré-requisitos

* Node.js >= 18
* npm ou yarn
* Conta e API Key da OpenAI (opcional, para uso real da IA)
* Arquivo `.env` configurado com:

```
OPENAI_API_KEY=your_api_key_here
USE_FAKE_AI=true
```

> `USE_FAKE_AI=true` ativa respostas simuladas da IA para testes sem gastar créditos.

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/seu-projeto.git
cd seu-projeto
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o `.env` com sua chave da OpenAI (opcional):

```env
OPENAI_API_KEY=your_api_key_here
USE_FAKE_AI=true
```

## Execução

### 1. Rodar o servidor Node

```bash
node index.js
```

* O servidor ficará disponível na porta `3000`.
* Endpoint disponível: `POST /webhook`

  * Exemplo de payload JSON:

  ```json
  {
    "Body": "1"
  }
  ```
* Retorna a saída formatada conforme a opção enviada.

### 2. Teste interativo pelo terminal

* Ao executar `node index.js`, o menu interativo aparecerá no terminal:

```
Escolha a opção de teste:
1 - Detalhes completos
2 - Resumo amigável
3 - Informações da empresa
4 - Resumo divertido
5 - Resumo com hobbies
6 - Rodar Troubleshooting
Digite o número da opção:
```

* Digite o número desejado e pressione Enter.
* Saída será exibida no terminal, usando cores e caixas de destaque (`chalk` + `boxen`).

## Saída esperada

Exemplo para **opção 1 (Detalhes completos)**:

```
=== Dados do Cliente (Claros) ===
Nome: Leanne Graham
Username: Bret
Email: Sincere@april.biz
Telefone: 1-770-736-8031 x56442
Endereço: Kulas Light, Apt. 556, Gwenborough
Website: hildegard.org
Empresa: Romaguera-Crona (Multi-layered client-server neural-net)
=================================
```

* Além disso, será exibido um **cartão colorido** com as mesmas informações.
* Complemento da IA (simulado ou real) será exibido abaixo, ex.:

```
IA complementa: [FAKE GPT RESPONSE] Simulação de resposta para: "Forneça detalhes completos do cliente..."
```

### Opção 6: Troubleshooting

* Simula erros de API, autenticação e JSON inválido.
* Mensagens de erro são exibidas em vermelho.

## Dependências principais

* `express` → servidor HTTP
* `readline` → input interativo no terminal
* `chalk` → cores no console
* `boxen` → caixas para destaque de texto
* `node-fetch` → fetch de APIs externas
* `dotenv` → variáveis de ambiente
* `openai` → integração com GPT

## Observações

* O webhook `/webhook` é genérico e aceita JSON com o campo `Body`.
* Para testes sem IA real, mantenha `USE_FAKE_AI=true`.


