# Simulador de URA Interativa

**Autor:** Vanderlândio Rocha  
**Objetivo:** Este projeto foi desenvolvido para o desafio técnico de **AI Integration Developer**, com o propósito de demonstrar integração com APIs REST, uso de IA generativa, simulação de URA e execução de troubleshooting básico.

---

## Funcionalidades

- Consome dados de clientes da API pública `https://jsonplaceholder.typicode.com/users`.
- Menu interativo no terminal com as opções:
  1. Detalhes completos do cliente.
  2. Resumo amigável.
  3. Informações da empresa.
  4. Resumo divertido.
  5. Resumo com hobbies fictícios.
- Chat contínuo no terminal: permite perguntas livres com histórico, integrando respostas da IA (via **OpenRouter GPT-3.5 Turbo** ou simulação com `USE_FAKE_AI`).
- Endpoint HTTP `/webhook` para integração via POST com campo `Body`.
- **Troubleshooting** implementado em função separada, simulando erros de API fora do ar, autenticação inválida e JSON malformado.

---

## Pré-requisitos

- Node.js
- npm ou yarn  
- Conta e API Key da OpenAI 
- Arquivo `.env` configurado:

```env
OPENROUTER_API_KEY=your_api_key_here
USE_FAKE_AI=true
````

> Com `USE_FAKE_AI=true`, as respostas da IA são simuladas para testes sem consumir créditos.

---

## Instalação

```bash
git clone https://github.com/seuusuario/seu-projeto.git
cd seu-projeto
npm install
```

---

## Execução

### 1. Terminal interativo

```bash
node index.js
```

* Digite números do menu (1–5) ou perguntas livres.
* Digite `sair` para encerrar.

### 2. Webhook HTTP

* POST para `/webhook` com JSON no formato:

```json
{
  "Body": "1"
}
```

* Retorna saída formatada conforme a opção escolhida.

### 3. Troubleshooting

O **troubleshooting não está no menu**.
Ele pode ser executado diretamente chamando a função `troubleshooting()` no código, para simular cenários de falha típicos de integração:

* API fora do ar
* Token inválido
* JSON malformado

As mensagens de erro são exibidas em vermelho no console.

---

## Tecnologias e ferramentas

* Node.js (JavaScript ES6)
* express → servidor HTTP
* readline → input interativo no console
* chalk → cores no terminal
* boxen → formatação em caixas
* node-fetch → consumo de APIs REST
* dotenv → variáveis de ambiente
* Integração opcional com **OpenRouter GPT-3.5 Turbo**
* Ferramentas de teste recomendadas: Postman, CodeSandbox

---

## Testes

A seguir alguns testes para validar o funcionamento do projeto.

### 1. Testes no Console (Node.js)

Execute o projeto no terminal:

```bash
node index.js
````

TTeste as opções:

* Digite `1` → Deve exibir detalhes completos do cliente em texto + cartão colorido.
* Digite `2` → Deve exibir um resumo amigável do cliente.
* Digite `3` → Deve exibir apenas informações da empresa.
* Digite `4` → Deve exibir um resumo divertido com emojis.
* Digite `5` → Deve exibir resumo com hobbies fictícios.
* Digite qualquer pergunta em texto → A IA (real ou simulada) deve responder, mantendo histórico no chat.
* Digite `sair` → Encerra o chat contínuo.

## 2.Testes via Postman (Webhook HTTP)

Configure uma requisição **POST** para:

```
http://localhost:3000/webhook
```

Com body no formato **JSON** (Content-Type: application/json):

```json
{
  "Body": "1"
}
```

Respostas esperadas:

* `"Body": "1"` → Detalhes completos do cliente.
* `"Body": "2"` → Resumo amigável.
* `"Body": "3"` → Informações da empresa.
* `"Body": "4"` → Resumo divertido.
* `"Body": "5"` → Resumo com hobbies fictícios.
* `"Body": "texto livre"` → A IA (real ou simulada) complementa a resposta.

### 3. Teste de Troubleshooting

O troubleshooting não faz parte do menu nem do webhook.
Para rodar manualmente:

1. Abra o arquivo `index.js`.
2. Localize a função `troubleshooting()`.
3. No final do arquivo, adicione a linha:

```js
// Executar troubleshooting manualmente
troubleshooting();
```

4. Execute novamente:

```bash
node index.js
```

O console deve exibir mensagens de erro simuladas em vermelho:

* API fora do ar
* Autenticação inválida
* JSON malformado



---

### Resumo dos testes:
## Testes Rápidos

| Ambiente     | Entrada (comando ou Body) | Saída Esperada |
|--------------|----------------------------|----------------|
| **Console**  | `1`                        | Detalhes completos do cliente (texto + cartão colorido) |
| **Console**  | `2`                        | Resumo amigável do cliente |
| **Console**  | `3`                        | Informações da empresa |
| **Console**  | `4`                        | Resumo divertido com emojis |
| **Console**  | `5`                        | Resumo com hobbies fictícios |
| **Console**  | Pergunta livre (ex: "Qual o nome do cliente?") | Resposta da IA (real ou simulada), mantendo histórico |
| **Console**  | `sair`                     | Encerra o chat contínuo |
| **Postman**  | `{"Body": "1"}`            | Retorna detalhes completos do cliente |
| **Postman**  | `{"Body": "2"}`            | Retorna resumo amigável |
| **Postman**  | `{"Body": "3"}`            | Retorna informações da empresa |
| **Postman**  | `{"Body": "4"}`            | Retorna resumo divertido |
| **Postman**  | `{"Body": "5"}`            | Retorna resumo com hobbies fictícios |
| **Postman**  | `{"Body": "texto livre"}`  | Retorna complemento da IA (real ou simulado) |
| **Troubleshooting** | Rodar `troubleshooting()` manualmente no código | Exibe erros simulados: API fora do ar, autenticação inválida, JSON malformado |


---

## Observações

* O chat mantém histórico de interação com a IA.
* O menu numérico e o chat livre faz uso de **engenharia de prompt**.
* O troubleshooting foi isolado em função específica para reforçar o diagnóstico técnico de erros comuns em integrações de URA.

