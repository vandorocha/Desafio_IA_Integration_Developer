const express = require('express');
const app = express();
app.use(express.json()); // Para ler JSON de webhooks (ex: Twilio)
const readline = require('readline');
const chalk = require('chalk');
const boxen = require('boxen');
const fetch = require('node-fetch'); // Compatibilidade do fetch no Node
require('dotenv').config(); // Carrega variáveis do .env
const OpenAI = require('openai');

// Inicializa cliente OpenAI
const clienteIA = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Buscar dados de clientes
async function buscarClientes() {
  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!resposta.ok) throw new Error(`Erro ao buscar clientes: ${resposta.status}`);
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Falha no fetch:", erro.message);
    return [];
  }
}

//Enviar prompt à IA 
async function enviarPromptIA(prompt) {
  try {
    if (process.env.USE_FAKE_AI === 'true') {
      console.log(chalk.yellow("\n=== PROMPT ENVIADO PARA A IA (simulado) ==="));
      console.log(prompt);
      return `[FAKE GPT RESPONSE] Simulação de resposta para: "${prompt}"`;
    }

    console.log(chalk.yellow("\n=== PROMPT ENVIADO PARA A IA ==="));
    console.log(prompt);

    const resposta = await clienteIA.chat.completions.create({
      model: "gpt-4o-mini", // rápido e barato, pode trocar por "gpt-4o"
      messages: [
        { role: "system", content: "Você é um assistente que responde de forma clara e amigável." },
        { role: "user", content: prompt }
      ],
    });

    const respostaIA = resposta.choices[0].message.content;

    console.log(chalk.green("\n=== RESPOSTA DA IA ==="));
    console.log(respostaIA);

    return respostaIA;
  } catch (erro) {
    console.error("Erro ao consultar a IA:", erro.message);
    return "Erro ao consultar a IA.";
  }
}

// Formatar sáida dos clientes
function formatarClienteSimples(cliente) {
  return `
=== Dados do Cliente (Claros) ===
Nome: ${cliente.name}
Username: ${cliente.username}
Email: ${cliente.email}
Telefone: ${cliente.phone}
Endereço: ${cliente.address.street}, ${cliente.address.suite}, ${cliente.address.city}
Website: ${cliente.website}
Empresa: ${cliente.company.name} (${cliente.company.catchPhrase})
=================================
  `;
}

function formatarClienteCartao(cliente) {
  const conteudo = `
Nome: ${cliente.name} (${cliente.username})
Email: ${cliente.email}
Telefone: ${cliente.phone}
Endereço: ${cliente.address.street}, ${cliente.address.suite}, ${cliente.address.city}
Website: ${cliente.website}
Empresa: ${cliente.company.name} - "${cliente.company.catchPhrase}"
  `;
  return boxen(chalk.cyan(conteudo), { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'yellow' });
}

function formatarResumoDivertido(cliente) {
  const conteudo = `
Resumo divertido - Cliente: ${cliente.name}
Username: ${cliente.username}
Email: ${cliente.email}
Telefone: ${cliente.phone}
Endereço: ${cliente.address.street}, ${cliente.address.suite}, ${cliente.address.city}
Website: ${cliente.website}
Empresa: ${cliente.company.name} - "${cliente.company.bs}" 😄
  `;
  return boxen(chalk.greenBright(conteudo), { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'magenta' });
}

function formatarResumoAmigavel(cliente) {
  const conteudo = `Olá! Aqui está um resumo amigável do cliente ${cliente.name} da empresa ${cliente.company.name}.`;
  return boxen(chalk.blueBright(conteudo), { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'green' });
}

function formatarResumoComHobbies(cliente) {
  const conteudo = `O cliente ${cliente.name} gosta de ler, praticar esportes e explorar novas tecnologias. Empresa: ${cliente.company.name}`;
  return boxen(chalk.yellowBright(conteudo), { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'blue' });
}


// Simulação de Troubleshooting
async function troubleshooting() {
  console.log(chalk.yellow("\n=== Iniciando Troubleshooting ==="));

  // Cenário 1: API fora do ar
  try {
    await fetch('https://jsonplaceholder.typicode.com/invalid-endpoint');
  } catch (erro) {
    console.error(chalk.red("Erro simulado: API fora do ar →", erro.message));
  }

  // Cenário 2: Erro de autenticação simulado
  try {
    throw new Error("Token inválido ou não fornecido.");
  } catch (erro) {
    console.error(chalk.red("Erro simulado: Autenticação falhou →", erro.message));
  }

  // Cenário 3: JSON inválido
  try {
    JSON.parse("{ invalid json }");
  } catch (erro) {
    console.error(chalk.red("Erro simulado: Falha ao parsear JSON →", erro.message));
  }

  console.log(chalk.green("=== Troubleshooting concluído ===\n"));
}

// Menu URA
async function menuURA(opcao) {
  const clientes = await buscarClientes();
  if (clientes.length === 0) return "Não há dados de clientes disponíveis.";

  const cliente = clientes[0]; // sempre pegando o primeiro cliente
  let prompt = "";
  let respostaTexto = "";

  switch(opcao) {
    case '1': // Detalhes completos
      prompt = `Forneça detalhes completos do cliente: ${JSON.stringify(cliente)}`;
      respostaTexto = formatarClienteSimples(cliente) + "\n" + formatarClienteCartao(cliente);
      break;
    case '2': // Resumo amigável
      prompt = `Crie um resumo amigável do cliente: ${JSON.stringify(cliente)}`;
      respostaTexto = formatarResumoAmigavel(cliente);
      break;
    case '3': // Informações da empresa
      prompt = `Forneça informações da empresa do cliente: ${JSON.stringify(cliente.company)}`;
      respostaTexto = `Empresa: ${cliente.company.name}\nCatchPhrase: ${cliente.company.catchPhrase}\nAtividades: ${cliente.company.bs}`;
      break;
    case '4': // Resumo divertido
      prompt = `Crie um resumo divertido e descontraído do cliente: ${JSON.stringify(cliente)}`;
      respostaTexto = formatarResumoDivertido(cliente);
      break;
    case '5': // Resumo com hobbies
      prompt = `Crie um resumo incluindo hobbies fictícios do cliente: ${JSON.stringify(cliente)}`;
      respostaTexto = formatarResumoComHobbies(cliente);
      break;
    default:
      return "Opção inválida. Escolha 1, 2, 3, 4 ou 5.";
  }

  // Chamada para a IA (real ou simulada)
  const respostaIA = await enviarPromptIA(prompt);
  return respostaTexto + "\n\n" + chalk.gray("IA complementa: " + respostaIA);
}


// Rota do webhook 
app.post('/webhook', async (req, res) => {
  const mensagem = req.body.Body;
  console.log('Mensagem recebida do Chat:', mensagem);

  const resposta = await menuURA(mensagem.trim());
  res.json({ Body: resposta });
});

// Rodar Servidor Node
const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
  console.log("Pronto para receber mensagens do Twilio Chat...");
});

// Testar com input do terminal

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
6 - Rodar Troubleshooting
Digite o número da opção: `, async (op) => {
    if (op.trim() === '6') {
      await troubleshooting();
    } else {
      const resultado = await menuURA(op.trim());
      console.log(resultado);
    }
    rl.close();
  });
}

// Descomente abaixo para rodar o teste interativo no terminal
testeInterativo();
