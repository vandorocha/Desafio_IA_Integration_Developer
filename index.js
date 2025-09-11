const express = require('express');
const app = express();
app.use(express.json());
const readline = require('readline');
const chalk = require('chalk');
const boxen = require('boxen');
const fetch = require('node-fetch');
require('dotenv').config();

// Histórico de conversa para diálogo contínuo
let chatHistory = [];

// Função para chamar OpenRouter GPT-3.5 Turbo com chat 
async function enviarPromptIA(prompt) {
  if (process.env.USE_FAKE_AI === 'true') {
    const fakeResposta = `[FAKE GPT RESPONSE] ${prompt}`;
    chatHistory.push({ role: "assistant", content: fakeResposta });
    return fakeResposta;
  }

  if (chatHistory.length === 0) {
    chatHistory.push({ role: "system", content: "Você é um assistente útil, informativo e educado." });
  }

  chatHistory.push({ role: "user", content: prompt });

  console.log(chalk.yellow("\n=== PROMPT ENVIADO PARA A IA (OpenRouter GPT-3.5 Turbo) ==="));
  console.log(prompt);

  try {
    const resposta = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: chatHistory,
        max_tokens: 300
      })
    });

    const dados = await resposta.json();
    if (dados.error) {
      console.error("Erro da API OpenRouter:", dados.error);
      return "Erro ao consultar a IA.";
    }

    const textoGerado = dados.choices?.[0]?.message?.content || "Sem resposta da IA";
    chatHistory.push({ role: "assistant", content: textoGerado });

    return textoGerado;

  } catch (erro) {
    console.error("Erro ao chamar OpenRouter:", erro.message);
    return "Erro ao consultar a IA.";
  }
}

// Busca de dados de clientes
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

// Formatação de saída
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

  try {
    await fetch('https://jsonplaceholder.typicode.com/invalid-endpoint');
  } catch (erro) {
    console.error(chalk.red("Erro simulado: API fora do ar →", erro.message));
  }

  try {
    throw new Error("Token inválido ou não fornecido.");
  } catch (erro) {
    console.error(chalk.red("Erro simulado: Autenticação falhou →", erro.message));
  }

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

  const cliente = clientes[0];
  let prompt = "";
  let respostaTexto = "";

  switch(opcao) {
    case '1':
      prompt = `Forneça detalhes completos do cliente: ${JSON.stringify(cliente)}`;
      respostaTexto = formatarClienteSimples(cliente) + "\n" + formatarClienteCartao(cliente);
      break;
    case '2':
      prompt = `Crie um resumo amigável do cliente: ${JSON.stringify(cliente)}`;
      respostaTexto = formatarResumoAmigavel(cliente);
      break;
    case '3':
      prompt = `Forneça informações da empresa do cliente: ${JSON.stringify(cliente.company)}`;
      respostaTexto = `Empresa: ${cliente.company.name}\nCatchPhrase: ${cliente.company.catchPhrase}\nAtividades: ${cliente.company.bs}`;
      break;
    case '4':
      prompt = `Crie um resumo divertido e descontraído do cliente: ${JSON.stringify(cliente)}`;
      respostaTexto = formatarResumoDivertido(cliente);
      break;
    case '5':
      prompt = `Crie um resumo incluindo hobbies fictícios do cliente: ${JSON.stringify(cliente)}`;
      respostaTexto = formatarResumoComHobbies(cliente);
      break;
    case '6':
      await troubleshooting();
      return "Troubleshooting concluído.";
    default:
      return "Opção inválida. Escolha 1, 2, 3, 4, 5 ou 6.";
  }

  const respostaIA = await enviarPromptIA(prompt);
  return respostaTexto + "\n\n" + chalk.gray("IA complementa: " + respostaIA);
}

// Função de chat com menu numérico integrado
async function chatComMenu() {
  console.log(chalk.green("\n=== Chat & Menu iniciado ==="));
  console.log("Digite uma pergunta livre ou um número do menu (1-6). Digite 'sair' para encerrar.\n");
  
  // Adicionando detalhamento do menu
  console.log("Opções do Menu:");
  console.log("Digite 1 → Deve exibir detalhes completos do cliente em texto + cartão colorido.");
  console.log("Digite 2 → Deve exibir um resumo amigável do cliente.");
  console.log("Digite 3 → Deve exibir apenas informações da empresa.");
  console.log("Digite 4 → Deve exibir um resumo divertido com emojis.");
  console.log("Digite 5 → Deve exibir resumo com hobbies fictícios.");
  console.log("Digite qualquer pergunta em texto → A IA (real ou simulada) deve responder, mantendo histórico no chat.");
  console.log("Digite sair → Encerra o chat contínuo.\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', async (input) => {
    const texto = input.trim().toLowerCase();
    if (texto === 'sair') {
      console.log(chalk.green("Encerrando chat..."));
      rl.close();
      process.exit(0);
    }

    // Se for número do menu, executa menuURA
    if (['1','2','3','4','5','6'].includes(texto)) {
      const resultado = await menuURA(texto);
      console.log(resultado + "\n");
      return;
    }

    // Pergunta livre: buscar clientes da API
    const clientes = await buscarClientes();
    let promptFinal = input;
    let dadosParaIA = [];

    // Filtra clientes se o input contém palavras-chave
    if (texto.includes("cliente") || texto.includes("todos") || texto.includes("nome") || texto.includes("email") || texto.includes("empresa")) {
      
      // Caso o usuário peça todos os clientes
      if (texto.includes("todos")) {
        dadosParaIA = clientes;
      } else {
        // Tenta encontrar clientes que correspondam a algum termo do input
        dadosParaIA = clientes.filter(c =>
          c.name.toLowerCase().includes(texto) ||
          c.username.toLowerCase().includes(texto) ||
          c.email.toLowerCase().includes(texto) ||
          c.company.name.toLowerCase().includes(texto)
        );
      }

      if (dadosParaIA.length > 0) {
        promptFinal += `\nAqui estão os dados do(s) cliente(s) encontrados:\n${JSON.stringify(dadosParaIA)}`;
      }
    }

    // Envia para IA
    const resposta = await enviarPromptIA(promptFinal);
    console.log(chalk.gray("\nIA: " + resposta + "\n"));
  });
}


// Rota do webhook
app.post('/webhook', async (req, res) => {
  const mensagem = req.body.Body;
  console.log('Mensagem recebida do Chat:', mensagem);

  const resposta = await menuURA(mensagem.trim());
  res.json({ Body: resposta });
});


// Executar servidor Node
const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
  console.log("Pronto para receber mensagens do webhook...");
});

// Inicia chat com menu
chatComMenu();


