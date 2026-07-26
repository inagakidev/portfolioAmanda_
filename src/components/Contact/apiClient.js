
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/**
 *
 * @param {{ nome: string, email: string, mensagem: string }} dados
 */
export async function sendContactEmail({ nome, email, mensagem }) {
  const response = await fetch(`${API_URL}/api/contato`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, mensagem }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.erro || "Erro ao enviar mensagem.");
  }

  return data;
}