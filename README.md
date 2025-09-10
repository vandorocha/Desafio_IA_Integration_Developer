# AI Integration Developer - Desafio Técnico 🚀

> Projeto de demonstração de integração de **API REST**, menu **URA local simulada** e simulação de respostas **GPT-5 Plus**.

---

## Objetivo do Projeto

* Integrar uma **API REST** utilizando JavaScript.
* Criar um **fluxo de atendimento simulado** com Inteligência Artificial (**URA local simulada**).
* Aplicar **engenharia de prompt**.
* Realizar **troubleshooting básico**.

O fluxo está preparado para futura integração com **GPT-5 Plus**, simulando atendimento inteligente a clientes.

---

## Tecnologias e Ferramentas

* **Node.js** (18+)
* **Express** – servidor web para webhook
* **Chalk / Boxen** – estilização de console
* **node-fetch** – fetch compatível com Node.js
* **dotenv** – variáveis de ambiente
* **OpenAI SDK** – integração com GPT real
* **Readline** – input interativo pelo terminal
* **Postman / curl** – para testes HTTP
* **CodeSandbox / VS Code** – desenvolvimento

---

## Estrutura do Projeto

```

Desafio\_IA\_Integration\_Developer/
├─ .codesandbox/
├─ .devcontainer/
├─ .gitignore
├─ index.js
├─ package.json
├─ yarn.lock
├─ README.md

````

* **index.js** → script principal:
  * Busca dados do cliente via API pública
  * Menu URA local simulada (terminal ou webhook)
  * Envio de prompt para GPT real ou fallback local
  * Formatação de dados em **cartões** via `boxen` + `chalk`
  * Testes interativos e resumos divertidos

---

## Dependências Node.js

Instale todas as dependências:

```bash
npm install express chalk boxen node-fetch dotenv openai
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
OPENAI_API_KEY=sua_chave_aqui
USE_FAKE_AI=true 

```
* `OPENAI_API_KEY` → chave para usar GPT real
* `USE_FAKE_AI=true` → ativa respostas simuladas sem precisar da API

---

## Integração com API Pública

**Endpoint JSONPlaceholder:**
[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

**Exemplo de resposta:**

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": { "street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874" },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": { "name": "Romaguera-Crona", "catchPhrase": "Multi-layered client-server neural-net", "bs": "harness real-time e-markets" }
}
```

---

## Menu URA Local Simulada

| Opção | Descrição                              |
| ----- | -------------------------------------- |
| 1     | Detalhes completos do cliente (cartão) |
| 2     | Resumo amigável                        |
| 3     | Informações da empresa                 |
| 4     | Resumo divertido                       |
| 5     | Resumo com hobbies fictícios           |

**Exemplo de saída (opção 1):**

```text
╭─────────────────────────────────────────────╮
│ Nome: Leanne Graham (Bret)                  │
│ Email: Sincere@april.biz                    │
│ Telefone: 1-770-736-8031 x56442             │
│ Endereço: Kulas Light, Apt. 556, Gwenborough│
│ Website: hildegard.org                      │
│ Empresa: Romaguera-Crona - "Multi-layered " │
╰─────────────────────────────────────────────╯
IA complementa: [FAKE GPT RESPONSE] Simulação de resposta detalhada
```

---

## Teste Interativo pelo Terminal

Execute:

```bash
node index.js
```

Escolha uma opção de 1 a 5 para ver o output formatado.

> Funciona mesmo com fallback local (`USE_FAKE_AI=true`).

---

## Webhook `/webhook`

Rota HTTP para receber mensagens (simula Twilio Chat):

```http
POST http://localhost:3000/webhook
Content-Type: application/json

Body:
{
  "Body": "1"
}
```

Resposta JSON:

```json
{
  "Body": "╭─...\nIA complementa: [FAKE GPT RESPONSE]..."
}
```

> Testável via Postman, curl ou Twilio Chat.

---

## Estratégia de Troubleshooting

* Falha no fetch da API → array vazio + log de erro
* Opção inválida no menu → `"Opção inválida. Escolha 1, 2, 3, 4 ou 5."`
* Falha ao chamar IA → fallback local garante fluxo funcional

---

## Próximos Passos

1. Substituir `USE_FAKE_AI=true` pelo GPT real usando `OPENAI_API_KEY`
2. Seleção de múltiplos prompts por cliente
3. Melhorar visualização dos cartões
4. Documentar prompts reais e respostas da IA

---

## Observações Finais

* Projeto pronto para rodar localmente sem GPT
* Testes interativos via terminal ou webhook
* Código modular, limpo e pronto para demonstração

---

## Links Úteis

* [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [OpenAI API](https://platform.openai.com/)

