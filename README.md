# AI Integration Developer - Desafio Técnico

## Objetivo do Projeto

Este projeto demonstra a capacidade de:

* Integrar uma **API REST** utilizando JavaScript.
* Criar um **fluxo de atendimento simulado** com Inteligência Artificial (**URA local simulada**).
* Aplicar **engenharia de prompt**.
* Realizar **troubleshooting básico**.

O fluxo está estruturado para futura integração com **GPT-5 Plus**, simulando atendimento inteligente a clientes.

---

## Tecnologias e Ferramentas

* **Node.js** (JavaScript)
* **Postman Web** ([teste de requisições à API](https://web.postman.co/))
* **CodeSandbox / VS Code** (desenvolvimento do projeto)
* **API pública JSONPlaceholder** ([https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users))
* **URA local simulada** (menu interativo via terminal)
* **GPT-5 Plus** (simulação atual, preparação para integração futura)
* **boxen / chalk** → estilização de console para resumos e cartões

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

* **index.js** → script principal:

  * Fetch de dados da API pública
  * Menu URA local simulada (terminal ou webhook)
  * Função de envio de prompt para GPT-5 Plus (simulada)
  * Formatação de dados em **cartão** via `boxen` + `chalk`
  * Testes do fluxo de atendimento, incluindo **resumo divertido**
* **package.json / yarn.lock** → gerenciamento de dependências Node.js

---

## Integração com API Pública (JSONPlaceholder)

### Endpoint utilizado

```http
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
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

---

## Fluxo do Menu URA Local Simulada

No `index.js`, implementamos um menu de atendimento **interativo via terminal**:

| Opção | Descrição                                                                          |
| ----- | ---------------------------------------------------------------------------------- |
| 1     | **Detalhes completos do cliente** – exibe todas as informações em formato “cartão” |
| 2     | **Resumo amigável do cliente** – texto amigável para usuário                       |
| 3     | **Informações da empresa** – nome, catchPhrase e atividades                        |
| 4     | **Resumo divertido** – resumo leve e descontraído com emoji                        |
| 5     | **Resumo com hobbies** – inclui hobbies fictícios para simulação personalizada     |
| -     | **Opção inválida** – retorna mensagem de erro clara                                |

### Exemplo de saída no console:

```text
   ╭──────────────────────────────────────────────────────────────────────────────╮
   │                                                                              │
   │   Nome: Leanne Graham (Bret)                                                 │
   │   Email: Sincere@april.biz                                                   │
   │   Telefone: 1-770-736-8031 x56442                                            │
   │   Endereço: Kulas Light, Apt. 556, Gwenborough                               │
   │   Website: hildegard.org                                                     │
   │   Empresa: Romaguera-Crona - "Multi-layered client-server neural-net"        │
   │                                                                              │
   ╰──────────────────────────────────────────────────────────────────────────────╯
IA complementa: [FAKE GPT RESPONSE] Simulação de resposta detalhada
```

> Mesmo sem conexão à API real ou ao GPT, o fluxo **simula respostas localmente**.

---

## 🛠 Estratégia de Troubleshooting

* **Falha no fetch da API** → log de erro e array vazio.
* **Opção inválida no menu URA** → mensagem: `"Opção inválida. Escolha 1, 2, 3, 4 ou 5."`
* **Falha na função de prompt para IA** → captura e log de erro.
* **Fallback local** → garante fluxo funcional mesmo sem acesso à IA ou API.

---

## Como Rodar Localmente

1. Clonar o repositório ou abrir no CodeSandbox.
2. Instalar dependências:

```bash
npm install
```

3. Criar arquivo `.env` com chave API (para testes reais com GPT):

```
OPENAI_API_KEY=sua_chave_aqui
```

4. Rodar aplicação:

```bash
node index.js
```

5. Seguir o **menu interativo** para testar todas as opções.
6. Para testar **fallback local**, o sistema simula respostas automaticamente, sem necessidade de API ou GPT.

---

## Exemplos de Prompt e Output da IA

### Prompt simulado

```text
Forneça detalhes completos do cliente: {"id":1,"name":"Leanne Graham",...}
```

### Output simulado

```text
[FAKE GPT RESPONSE] Simulação de resposta detalhada do cliente.
```

> O sistema ainda formata dados em **cartões**, resumos amigáveis, divertidos e com hobbies mesmo sem IA real.

---

## Próximos Passos

1. Substituir `sendPromptToGPT` por **chamada real ao GPT-5 Plus** usando a chave API.
2. Implementar **seleção de múltiplos prompts** por cliente.
3. Melhorar **visualização em formato “cartão”** para console ou front-end.
4. Documentar completamente integração URA + IA com prompts e respostas reais.

---

## Observações Finais

* Todo o fluxo está pronto para integração futura com GPT-5 Plus ou URA real.
* Menu local simulado garante **autonomia de testes e demonstração**.
* Projeto cumpre requisitos de:

  * Integração API REST
  * Manipulação de JSON
  * Menu interativo
  * Troubleshooting
* Resumo divertido, cartões e hobbies implementados.
* Código limpo, modular e pronto para entrega.

