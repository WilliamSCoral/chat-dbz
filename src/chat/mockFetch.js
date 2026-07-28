const MOCK_RESPONSES = {
  'Goku': [
    '¡Eso suena increíble! Me recuerda cuando entrené en el Cuarto del Espíritu y el Tiempo. ¡Tenés que superar tus límites!',
    '¡Ja! Un verdadero guerrero enfrenta eso con una sonrisa. ¿Querés entrenar juntos algún día?',
    'El esfuerzo siempre vale la pena, ¡eso lo aprendí desde que era chico en el Planeta Tierra!',
  ],
  'Vegeta': [
    'Humano ordinario, esa pregunta apenas merece mi respuesta. Pero dado que soy el Príncipe de los Saiyans, te iluminaré.',
    'Mi poder supera al de cualquier ser en este universo. Lo que me preguntás es casi irrelevante para alguien de mi nivel.',
    'Solo un bajo nivel haría esa pregunta. Pero como soy magnánimo, responderé esta única vez.',
  ],
  'Gohan': [
    'Eso es muy interesante. Creo que podríamos analizarlo desde distintos ángulos. ¿Qué sabés hasta ahora?',
    'Mi papá siempre dice que el esfuerzo lo es todo, y en esto también aplica. Investigiguémoslo juntos.',
    'Como estudiante, entiendo esa duda. La clave está en no rendirse y buscar la respuesta con método.',
  ],
  'Freezer': [
    'Qué pregunta tan... ordinaria. Supongo que no puedo esperar más de una criatura de tu nivel evolutivo.',
    'Fascinante que te atrevas a dirigirte a mí directamente. Responderé, pero solo porque me divierte.',
    'En mis años dominando el universo he escuchado preguntas más interesantes. Aun así, te daré una respuesta.',
  ],
  'Bulma': [
    '¡Obvio! Con la tecnología Capsule Corporation eso se resuelve en cinco minutos. Dejame pensar...',
    'Eso tiene una explicación científica muy clara. Mi papá y yo lo analizamos hace años en el laboratorio.',
    '¡Genial pregunta! Aunque, siendo honesta, yo ya sé la respuesta. La cuestión es si podés entenderla.',
  ],
  'Majin Buu': [
    '¡Buu no entiende mucho eso! ¿Hay chocolates? Buu piensa mejor con chocolates.',
    '¡Uiii! Eso suena divertido. ¡Buu quiere jugar también! ¿Jugamos después?',
    'Buu sabe pocas cosas, pero sabe que los amigos son buenos. ¡Vos sos amigo de Buu!',
  ],
};

const DEFAULT_RESPONSES = [
  'Eso es algo muy interesante. Déjame pensar en ello.',
  'En el universo Dragon Ball, todo es posible.',
];

function getCharacterName(systemPrompt) {
  const match = systemPrompt.match(/^Eres (\w+)/);
  return match ? match[1] : null;
}

function getRandomResponse(name) {
  const pool = MOCK_RESPONSES[name] ?? DEFAULT_RESPONSES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export async function mockFetch(payload) {
  await new Promise(resolve => setTimeout(resolve, 1200));

  const name = getCharacterName(payload.system);
  const text = getRandomResponse(name);

  return {
    content: [{ type: 'text', text }],
    usage: { input_tokens: 80, output_tokens: 40 },
    stop_reason: 'end_turn',
  };
}
