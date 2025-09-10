# AI Integration Developer - Desafio Técnico

## Objetivo do Projeto
Este projeto tem como objetivo demonstrar a capacidade de integrar uma API REST utilizando JavaScript, criar um fluxo de atendimento simulado com Inteligência Artificial (URA simulada), aplicar engenharia de prompt e realizar troubleshooting básico.  

O fluxo foi estruturado para que, posteriormente, seja integrado ao **GPT-5 Plus**, simulando atendimento inteligente a clientes.

---

## Tecnologias e Ferramentas
- **Node.js** (JavaScript)  
- **Postman Web** (teste de requisições à API)  
- **CodeSandbox / VS Code** (desenvolvimento do projeto)  
- **API pública JSONPlaceholder** (simulação de dados de clientes)  
- **GPT-5 Plus** (simulação atual, integração futura)  

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

```

- **index.js** → script principal contendo:  
  - Fetch de dados da API pública  
  - Menu URA simulado  
  - Função de envio de prompt para GPT-5 Plus (simulada)  
  - Testes do fluxo de atendimento  

- **package.json / yarn.lock** → gerenciamento de dependências (Node.js)  

---

## Integração com API Pública (JSONPlaceholder)

### Objetivo
Consumir dados de clientes simulados para alimentar o fluxo URA e gerar prompts dinâmicos para a IA.  

### Endpoint utilizado
```

GET [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

````

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
````

---

## Fluxo do Menu URA Simulado

No `index.js`, implementamos um **menu de atendimento simulado** com três opções:

1. **Opção 1 – Detalhes completos do cliente**

   * Gera um prompt com todos os dados do cliente retornados pela API.

2. **Opção 2 – Resumo amigável do cliente**

   * Gera um prompt solicitando que a IA crie um resumo amigável com os dados do cliente.

3. **Opção inválida**

   * Retorna mensagem de erro indicando que a opção não é reconhecida.

**Exemplo de console (simulação):**

```
Teste URA - Opção 1
Prompt enviado: Forneça detalhes completos do cliente: {...JSON do cliente...}
Resposta da IA: Resposta simulada da IA para o prompt: "..."

Teste URA - Opção 2
Prompt enviado: Crie um resumo amigável do cliente: {...JSON do cliente...}
Resposta da IA: Resposta simulada da IA para o prompt: "..."

Teste URA - Opção inválida
Opção inválida
```

---

## Estratégia de Troubleshooting

* **Falha no fetch da API:**

  * Mensagem de erro no console indicando o status HTTP.
  * Retorno de array vazio para evitar travamento do fluxo.

* **Opção inválida no menu URA:**

  * Mensagem clara de "Opção inválida".

* **Falha na função de prompt para IA:**

  * Captura e exibição de erros no console.

> Esta estratégia garante que o fluxo funcione mesmo com dados inconsistentes ou indisponíveis.

---

## Próximos Passos

1. Substituir a função simulada `sendPromptToGPT` pela **chamada real ao GPT-5 Plus** usando a chave API.
2. Capturar respostas reais do GPT-5 Plus e atualizar a documentação com prints reais.
3. Testar e ajustar prompts para diferentes cenários de atendimento.
4. Preparar a documentação final de integração URA + IA, incluindo troubleshooting completo e exemplos de prompts/respostas.

---

## Observações Finais
* Todo o fluxo está **preparado para integração futura com GPT-5 Plus**.