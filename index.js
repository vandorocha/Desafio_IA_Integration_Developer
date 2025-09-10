const express = require('express');
//const fetch = require('node-fetch'); // Caso use Node <18, instale: npm install node-fetch
const app = express();
app.use(express.json()); // Para ler JSON do webhook Twilio

// Função para buscar clientes
async function getClientData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`Erro ao buscar clientes: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha no fetch:", error.message);
    return [];
  }
}

// Função para enviar prompt ao GPT-5 Plus (simulado)
async function sendPromptToGPT(prompt) {
  try {
    console.log("Prompt enviado:", prompt);
    // Simulação de resposta
    return `Resposta simulada da IA para o prompt: "${prompt}"`;
  } catch (error) {
    console.error("Erro ao enviar prompt:", error.message);
    return "Erro na IA";
  }
}

// Função para criar "cartão" do cliente
function formatClientCard(client) {
  return `
==============================
Nome: ${client.name} (${client.username})
Email: ${client.email}
Telefone: ${client.phone}
Endereço: ${client.address.street}, ${client.address.suite}, ${client.address.city}
Website: ${client.website}
Empresa: ${client.company.name} - "${client.company.catchPhrase}"
==============================
`;
}

// Função do menu URA
async function menuURA(option) {
  const clients = await getClientData();
  if (clients.length === 0) {
    return "Não há dados de clientes disponíveis.";
  }

  const client = clients[0]; // Sempre pegando o primeiro cliente
  let prompt = "";
  let responseText = "";

  switch(option) {
    case '1':
      prompt = `Forneça detalhes completos do cliente: ${JSON.stringify(client)}`;
      responseText = formatClientCard(client);
      break;
    case '2':
      prompt = `Crie um resumo amigável do cliente: ${JSON.stringify(client)}`;
      responseText = `Olá! Aqui está um resumo amigável do cliente ${client.name} da empresa ${client.company.name}.`;
      break;
    case '3':
      prompt = `Forneça informações da empresa do cliente: ${JSON.stringify(client.company)}`;
      responseText = `Empresa: ${client.company.name}\nCatchPhrase: ${client.company.catchPhrase}\nAtividades: ${client.company.bs}`;
      break;
    default:
      return "Opção inválida. Escolha 1, 2 ou 3.";
  }

  const aiResponse = await sendPromptToGPT(prompt); // futuramente substitui o responseText
  console.log("Resposta da IA (simulada):", aiResponse);
  return responseText;
}

// Rota do webhook Twilio Chat
app.post('/webhook', async (req, res) => {
  const mensagem = req.body.Body; // Digito ou mensagem enviada pelo usuário
  console.log('Mensagem recebida do Chat Twilio:', mensagem);

  const resposta = await menuURA(mensagem.trim());
  // Twilio espera JSON com Body
  res.json({ Body: resposta });
});

// Servidor Node.js
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log("Pronto para receber mensagens do Twilio Chat...");
});


// Teste rápido local
(async () => {
  console.log(await menuURA('1')); // detalhes completos (cartão)
  console.log(await menuURA('2')); // resumo amigável
  console.log(await menuURA('3')); // informações da empresa
  console.log(await menuURA('99')); // opção inválida
})();
