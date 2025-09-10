const express = require('express');
const app = express();
app.use(express.json()); // Para ler JSON do webhook Twilio
const readline = require('readline');
const chalk = require('chalk');
const boxen = require('boxen');
const fetch = require('node-fetch'); // <- garante compatibilidade do fetch no Node
require('dotenv').config(); // Carrega variáveis do .env
const OpenAI = require('openai');

// Inicializa cliente OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Função para buscar clientes
async function getClientData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error(`Erro ao buscar clientes: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha no fetch:", error.message);
    return [];
  }
}

// Função para enviar prompt ao GPT real ou fallback local
async function sendPromptToGPT(prompt) {
  try {
    if (process.env.USE_FAKE_AI === 'true') {
      // Fallback local: respostas simuladas
      console.log("Prompt enviado (simulado):", prompt);
      return `[FAKE GPT RESPONSE] Simulação de resposta para: "${prompt}"`;
    }

    // Chamada real à API OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // rápido e barato, pode trocar por "gpt-4o"
      messages: [
        { role: "system", content: "Você é um assistente que responde de forma clara e amigável." },
        { role: "user", content: prompt }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao enviar prompt:", error.message);
    return "Erro ao consultar a IA.";
  }
}

// Funções de formatação do cliente
function formatClientCardStyled(client) {
  const content = `
Nome: ${client.name} (${client.username})
Email: ${client.email}
Telefone: ${client.phone}
Endereço: ${client.address.street}, ${client.address.suite}, ${client.address.city}
Website: ${client.website}
Empresa: ${client.company.name} - "${client.company.catchPhrase}"
  `;
  return boxen(chalk.cyan(content), { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'yellow' });
}

function formatFunSummaryStyled(client) {
  const content = `
Resumo divertido - Cliente: ${client.name}
Username: ${client.username}
Email: ${client.email}
Telefone: ${client.phone}
Endereço: ${client.address.street}, ${client.address.suite}, ${client.address.city}
Website: ${client.website}
Empresa: ${client.company.name} - "${client.company.bs}" 😄
  `;
  return boxen(chalk.greenBright(content), { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'magenta' });
}

function formatFriendlySummaryStyled(client) {
  const content = `Olá! Aqui está um resumo amigável do cliente ${client.name} da empresa ${client.company.name}.`;
  return boxen(chalk.blueBright(content), { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'green' });
}

function formatHobbiesSummaryStyled(client) {
  const content = `O cliente ${client.name} gosta de ler, praticar esportes e explorar novas tecnologias. Empresa: ${client.company.name}`;
  return boxen(chalk.yellowBright(content), { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'blue' });
}

// Função do menu URA
async function menuURA(option) {
  const clients = await getClientData();
  if (clients.length === 0) return "Não há dados de clientes disponíveis.";

  const client = clients[0]; // sempre pegando o primeiro cliente
  let prompt = "";
  let responseText = "";

  switch(option) {
    case '1': // Detalhes completos
      prompt = `Forneça detalhes completos do cliente: ${JSON.stringify(client)}`;
      responseText = formatClientCardStyled(client);
      break;
    case '2': // Resumo amigável
      prompt = `Crie um resumo amigável do cliente: ${JSON.stringify(client)}`;
      responseText = formatFriendlySummaryStyled(client);
      break;
    case '3': // Informações da empresa
      prompt = `Forneça informações da empresa do cliente: ${JSON.stringify(client.company)}`;
      responseText = `Empresa: ${client.company.name}\nCatchPhrase: ${client.company.catchPhrase}\nAtividades: ${client.company.bs}`;
      break;
    case '4': // Resumo divertido
      prompt = `Crie um resumo divertido e descontraído do cliente: ${JSON.stringify(client)}`;
      responseText = formatFunSummaryStyled(client);
      break;
    case '5': // Resumo com hobbies
      prompt = `Crie um resumo incluindo hobbies fictícios do cliente: ${JSON.stringify(client)}`;
      responseText = formatHobbiesSummaryStyled(client);
      break;
    default:
      return "Opção inválida. Escolha 1, 2, 3, 4 ou 5.";
  }

  // Chamada para a IA (real ou simulada)
  const aiResponse = await sendPromptToGPT(prompt);
  console.log("Resposta da IA:", aiResponse);

  return responseText + "\n\n" + chalk.gray("IA complementa: " + aiResponse);
}

// Rota do webhook Twilio Chat
app.post('/webhook', async (req, res) => {
  const mensagem = req.body.Body;
  console.log('Mensagem recebida do Chat Twilio:', mensagem);

  const resposta = await menuURA(mensagem.trim());
  res.json({ Body: resposta });
});

// Servidor Node.js
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log("Pronto para receber mensagens do Twilio Chat...");
});

// Função de teste com input do terminal
async function testeInterativo() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(`
Escolha a opção de teste:
1 - Detalhes completos
2 - Resumo amigável
3 - Informações da empresa
4 - Resumo divertido
5 - Resumo com hobbies
Digite o número da opção: `, async (op) => {
    const resultado = await menuURA(op.trim());
    console.log(resultado);
    rl.close();
  });
}

// Descomente abaixo para rodar o teste interativo no terminal
testeInterativo();
