export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, systemPrompt } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'El campo message es requerido' });
    }

    // Simulación de delay de red
    await new Promise(resolve => setTimeout(resolve, 800));

    const reply = `[Mock serverless] Recibí: "${message}". Sistema: "${systemPrompt?.slice(0, 60)}..."`;

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Error in chat handler:', error);
    return res.status(500).json({ error: 'Error al generar la respuesta' });
  }
}
