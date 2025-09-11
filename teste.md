

# Testes da Aplicação

## 1. Preparação

* [ ] Instale as dependências:

  ```bash
  npm install
  ```
* [ ] Crie um arquivo `.env` com:

  ```env
  OPENAI_API_KEY=sua_chave_aqui   # se quiser usar IA real
  USE_FAKE_AI=true                # para simulação sem custo
  ```
* [ ] Suba o servidor:

  ```bash
  node index.js
  ```

---

## 2. Testes no Console (menu interativo)

Quando executar `node index.js`, o menu aparecerá no terminal. Digite os números abaixo e valide cada saída:

* [ ] **Opção 1 – Detalhes completos**

  * Exibição clara + exibição estilizada em caixa.
  * Prompt impresso (`=== PROMPT ENVIADO PARA A IA ===`).
  * Resposta da IA (simulada ou real).

* [ ] **Opção 2 – Resumo amigável**

  * Caixa azul/verde com resumo amigável.
  * Complemento da IA.

* [ ] **Opção 3 – Informações da empresa**

  * Nome da empresa, catchphrase e atividades.
  * Complemento da IA.

* [ ] **Opção 4 – Resumo divertido**

  * Caixa magenta com resumo divertido.
  * Complemento da IA.

* [ ] **Opção 5 – Resumo com hobbies**

  * Caixa amarela/azul com hobbies fictícios.
  * Complemento da IA.

* [ ] **Opção 6 – Troubleshooting**

  * Log amarelo “Iniciando Troubleshooting”.
  * Erro vermelho simulando API fora do ar.
  * Erro vermelho simulando falha de autenticação.
  * Erro vermelho simulando JSON inválido.
  * Mensagem verde “Troubleshooting concluído”.

---

## 3. Testes via Postman (rota `/webhook`)

1. Abra o **Postman**.
2. Crie uma requisição **POST**:

   * URL: `http://localhost:3000/webhook`
   * Headers:

     ```
     Content-Type: application/json
     ```
   * Body (raw, JSON):

     ```json
     { "Body": "1" }
     ```

* [ ] **Teste 1 – Cliente Detalhes**

  * Body: `{ "Body": "1" }`
  * Esperado: JSON retornando `"Body": "=== Dados do Cliente..."`.

* [ ] **Teste 2 – Resumo Amigável**

  * Body: `{ "Body": "2" }`
  * Esperado: Texto amigável do cliente + complemento da IA.

* [ ] **Teste 3 – Opção inválida**

  * Body: `{ "Body": "99" }`
  * Esperado: `"Opção inválida. Escolha 1, 2, 3, 4 ou 5."`.

---

## 4. Teste com IA Real (opcional)

* [ ] No `.env`, altere:

  ```env
  USE_FAKE_AI=false
  ```
* [ ] Execute novamente:

  ```bash
  node index.js
  ```
* [ ] Escolha qualquer opção no menu.

  * Prompt deve aparecer no console.
  * Resposta **real da LLM** deve aparecer em verde e também anexada na saída.

---

## 5. Validação Final

* [ ] API pública está sendo consumida (`jsonplaceholder.typicode.com`).
* [ ] Fluxo com IA ativo (simulado ou real).
* [ ] Troubleshooting cobre falhas comuns.
* [ ] Webhook responde como integração externa.
* [ ] Console mostra todo o diálogo IA → sistema → resposta.


