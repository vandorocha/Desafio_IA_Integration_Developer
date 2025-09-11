Este projeto é um **simulador de URA (Unidade de Resposta Audível) interativa**, desenvolvido para o desafio técnico de **AI Integration Developer**. Ele consome dados de uma API pública, permite criar fluxos de atendimento com IA generativa e realiza troubleshooting básico de integração.

## Objetivo

Avaliar habilidades em:
- Integração com APIs REST usando JavaScript.
- Criação de fluxos de atendimento com IA (engenharia de prompt).
- Troubleshooting entre aplicação, infraestrutura e simulação de URA.
- Documentação clara do fluxo e solicitações técnicas.

## Funcionalidades

* Busca dados de clientes de `https://jsonplaceholder.typicode.com/users`.
* Menu interativo com opções numéricas:
  1. Detalhes completos do cliente.
  2. Resumo amigável.
  3. Informações da empresa.
  4. Resumo divertido.
  5. Resumo com hobbies fictícios.
  6. Rodar troubleshooting (erros simulados de API, autenticação e JSON inválido).
* Chat contínuo no terminal: permite perguntas livres com histórico, integrando respostas da IA via **OpenRouter GPT-3.5 Turbo**.
* Saída formatada com cores e caixas de destaque (`chalk` + `boxen`).
* Endpoint HTTP `/webhook` para integração via POST com campo `Body`.

## Pré-requisitos

* Node.js >= 18
* npm ou yarn
* Conta e API Key da OpenAI (opcional)
* Arquivo `.env` configurado:

```env
OPENROUTER_API_KEY=your_api_key_here
USE_FAKE_AI=true
````

> `USE_FAKE_AI=true` ativa respostas simuladas da IA para testes sem consumir créditos.

## Instalação

```bash
git clone https://github.com/seuusuario/seu-projeto.git
cd seu-projeto
npm install
```

## Execução

### 1. Terminal interativo

```bash
node index.js
```

* Digite números do menu (1–6) ou perguntas livres.
* Digite `sair` para encerrar.
* Exemplo de menu no terminal:

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

### 2. Webhook HTTP

* POST `/webhook` aceita JSON com o campo `Body`:

```json
{
  "Body": "1"
}
```

* Retorna saída formatada conforme a opção escolhida.

## Exemplo de saída (Opção 1)

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

* Cartão colorido com as mesmas informações.
* Complemento da IA (simulado ou real):

```
IA complementa: [FAKE GPT RESPONSE] Simulação de resposta para: "Forneça detalhes completos do cliente..."
```

### Opção 6: Troubleshooting

* Simula erros:

  * API fora do ar
  * Token inválido
  * JSON mal formado
* Mensagens de erro exibidas em vermelho para análise.

## Tecnologias e ferramentas

* `Node.js`, `JavaScript` (ES6)
* `express` → servidor HTTP
* `readline` → input interativo
* `chalk` → cores no terminal
* `boxen` → caixas para destaque
* `node-fetch` → consumo de APIs REST
* `dotenv` → variáveis de ambiente
* Integração opcional com **OpenRouter GPT-3.5 Turbo**
* Ferramentas de teste recomendadas: Postman, CodeSandbox

## Observações

* Chat contínuo mantém histórico, permitindo contexto entre perguntas.
* Menu + chat livre demonstra **engenharia de prompt** e integração com IA.
* Troubleshooting simula **diagnóstico técnico** básico de APIs e URAs.
* Documentação do fluxo e exemplos estão no próprio código (`index.js`), com prompts e formatação.

