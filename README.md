# AI Integration Developer - Desafio Técnico

## Objetivo do Projeto

Este projeto tem como objetivo demonstrar a capacidade de integrar uma API REST utilizando JavaScript, criar um fluxo de atendimento simulado com Inteligência Artificial (URA via **Twilio Chat**), aplicar engenharia de prompt e realizar troubleshooting básico.

O fluxo foi estruturado para que, posteriormente, seja integrado ao **GPT-5 Plus**, simulando atendimento inteligente a clientes.

---

## Tecnologias e Ferramentas

* **Node.js** (JavaScript)
* **Postman Web** (teste de requisições à API)
* **CodeSandbox / VS Code** (desenvolvimento do projeto)
* **API pública JSONPlaceholder** (simulação de dados de clientes)
* **Twilio Chat** (URA textual gratuita, integração atual)
* **GPT-5 Plus** (simulação atual, integração futura)

---

## Estrutura do Projeto

```
Desafio_IA_Integration_Developer/
├─ .codesandbox/
├─ .devcontainer/
├─ .gitignore
├─ index.js
├─ package.json
├─ yarn.lock
├─ README.md
```

* **index.js** → script principal contendo:

  * Fetch de dados da API pública
  * Menu URA via Twilio Chat
  * Função de envio de prompt para GPT-5 Plus (simulada)
  * Testes do fluxo de atendimento

* **package.json / yarn.lock** → gerenciamento de dependências (Node.js)

---

## Integração com API Pública (JSONPlaceholder)

### Objetivo

Consumir dados de clientes simulados para alimentar o fluxo URA e gerar prompts dinâmicos para a IA.

### Endpoint utilizado

```
GET https://jsonplaceholder.typicode.com/users
```

### Exemplo de resposta

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874"
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona"
  }
}
```

---

## Fluxo do Menu URA via Twilio Chat

No `index.js`, implementamos um **menu de atendimento textual** com três opções:

1. **Opção 1 – Detalhes completos do cliente**

   * Exibe todas as informações do cliente retornadas pela API em formato “cartão” no console.

2. **Opção 2 – Resumo amigável do cliente**

   * Cria um resumo amigável e fácil de ler, pronto para enviar ao usuário via chat.

3. **Opção 3 – Informações da empresa**

   * Exibe detalhes da empresa do cliente (nome, catchPhrase, atividades).

4. **Opção inválida**

   * Retorna mensagem de erro indicando que a opção não é reconhecida.

**Exemplo de console (simulação):**

```
Servidor rodando na porta 3000
Pronto para receber mensagens do Twilio Chat...

Prompt enviado: Forneça detalhes completos do cliente: {...JSON do cliente...}
Resposta da IA (simulada): "..."

==============================
Nome: Leanne Graham (Bret)
Email: Sincere@april.biz
Telefone: 1-770-736-8031 x56442
Endereço: Kulas Light, Apt. 556, Gwenborough
Website: hildegard.org
Empresa: Romaguera-Crona - "Multi-layered client-server neural-net"
==============================

Prompt enviado: Crie um resumo amigável do cliente: {...JSON do cliente...}
Resposta da IA (simulada): "Olá! Aqui está um resumo amigável do cliente Leanne Graham da empresa Romaguera-Crona."
```

---

## Estratégia de Troubleshooting

* **Falha no fetch da API** → mensagem de erro no console e retorno de array vazio.
* **Opção inválida no menu URA** → mensagem clara "Opção inválida. Escolha 1, 2 ou 3."
* **Falha na função de prompt para IA** → captura e exibição de erros no console.

> Garantia de fluxo funcional mesmo com dados inconsistentes ou indisponíveis.

---

## Próximos Passos

1. Substituir a função simulada `sendPromptToGPT` pela **chamada real ao GPT-5 Plus** usando a chave API.
2. Implementar **resumos mais amigáveis e divertidos** via GPT-5 Plus.
3. Adicionar **seleção de múltiplos prompts** por cliente.
4. Melhorar **visualização de dados em formato “cartão”** para o console ou front-end básico.
5. Documentar completamente a integração URA + IA com exemplos reais de prompts e respostas.

---

## Observações Finais

* Todo o fluxo está preparado para integração futura com GPT-5 Plus.
* URA via Twilio Chat substitui a simulação anterior, garantindo **uso de webhooks e autenticação** no fluxo textual.
* Projeto já cumpre requisitos de integração API REST, manipulação de JSON, menu interativo e troubleshooting.

---
