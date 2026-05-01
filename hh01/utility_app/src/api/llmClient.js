// Sends a prompt to the Cloudflare Worker at /api/chat, which proxies to Anthropic.
// The API key lives server-side only — never in the client bundle.
export async function invokeLLM(prompt, systemContext = '') {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, systemContext }),
  });

  if (!response.ok) {
    throw new Error(`Hero Agent request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.reply;
}
