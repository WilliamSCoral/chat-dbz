export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const GEMINI_MODEL = 'gemini-3.1-flash';

  try {
    const { message, systemPrompt, history = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'El campo message es requerido.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Error de configuración del servidor.' });
    }

    const contents = [
      ...history
        .filter(msg => msg.role && msg.content)
        .map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.85,
          },
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errData?.error?.message ?? 'Error al comunicarse con la IA.',
      });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) return res.status(500).json({ error: 'No se recibió respuesta válida.' });

    return res.status(200).json({ reply: reply.trim() });

  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
