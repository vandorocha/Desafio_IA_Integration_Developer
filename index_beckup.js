
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

// Função de menu URA
async function menuURA(option) {
  const clients = await getClientData();
  if (clients.length === 0) {
    return "Não há dados de clientes disponíveis.";
  }

  let prompt = "";
  switch(option) {
    case 1:
      prompt = `Forneça detalhes completos do cliente: ${JSON.stringify(clients[0])}`;
      break;
    case 2:
      prompt = `Crie um resumo amigável do cliente: ${JSON.stringify(clients[0])}`;
      break;
    default:
      return "Opção inválida";
  }

  const response = await sendPromptToGPT(prompt);
  console.log("Resposta da IA:", response);
  return response;
}

// Teste rápido do menu URA
(async () => {
  console.log("Teste URA - Opção 1");
  await menuURA(1);

  console.log("\nTeste URA - Opção 2");
  await menuURA(2);

  console.log("\nTeste URA - Opção inválida");
  await menuURA(99);
})();
