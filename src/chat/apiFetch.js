export async function apiFetch(payload) {
  const messages = payload.messages;
  const lastMessage = messages[messages.length - 1];
  const history = messages.slice(0, -1);

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: lastMessage?.content ?? '',
      systemPrompt: payload.system,
      history,
    }),
  });

  if (!response.ok) {
    const err = new Error(`HTTP ${response.status}`);
    if (response.status === 429) {
      err.status = 429;
      err.retryAfterSeconds = 5;
    }
    throw err;
  }

  const { reply, error } = await response.json();
  if (error) throw new Error(error);

  return {
    content: [{ type: 'text', text: reply }],
    stop_reason: 'end_turn',
  };
}
