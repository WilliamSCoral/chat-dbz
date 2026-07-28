import { showView } from '../utils.js';
import { getState, setState } from '../state.js';

export function renderChat() {
  showView('view-chat', '/chat');

  const character = JSON.parse(sessionStorage.getItem('character') || 'null');

  if (character) {
    document.querySelector('.chatHeader__avatar').src = character.image;
    document.querySelector('.chatHeader__avatar').alt = character.name;
    document.querySelector('.chatHeader__name').textContent = character.name;
    document.querySelector('.chatMessages .state p:last-child').textContent =
      `Escribí un mensaje para hablar con ${character.name}.`;
  }

  setState({ status: 'idle', messages: [], character, error: null });

  const form = document.querySelector('.chatComposer');
  const newForm = form.cloneNode(true);
  form.replaceWith(newForm);
  newForm.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();

  const input = document.querySelector('.chatInput');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';

  const { messages, character } = getState();
  const userMsg = { role: 'user', content: text };
  const updatedMessages = [...messages, userMsg];

  setState({ status: 'loading', messages: updatedMessages });
  renderMessages();

  try {
    await new Promise(resolve => setTimeout(resolve, 1200));

    const characterName = character?.name || 'el personaje';
    const botMsg = {
      role: 'character',
      content: `[${characterName}]: La conexión con la IA se configura en el próximo módulo.`,
    };

    setState({ status: 'success', messages: [...updatedMessages, botMsg] });
    renderMessages();

  } catch (error) {
    setState({ status: 'error', error: error.message });
    renderMessages();
  }
}

function renderMessages() {
  const { status, messages, error } = getState();
  const container = document.querySelector('.chatMessages');

  if (status === 'idle' || messages.length === 0) {
    container.innerHTML = `
      <div class="state state--empty">
        <div class="stateContent">
          <p class="stateEmoji">💬</p>
          <h2>¡Iniciá la conversación!</h2>
          <p>Escribí un mensaje para comenzar.</p>
        </div>
      </div>
    `;
    return;
  }

  const messagesHTML = messages.map(msg => `
    <div class="message message--${msg.role === 'user' ? 'user' : 'character'}">
      ${msg.content}
    </div>
  `).join('');

  const loadingHTML = status === 'loading' ? `
    <div class="message message--character message--loading">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  ` : '';

  const errorHTML = status === 'error' ? `
    <div class="state state--error">
      <div class="stateContent">
        <p>Error: ${error}</p>
        <button class="stateRetry" id="retry-msg">Reintentar</button>
      </div>
    </div>
  ` : '';

  container.innerHTML = messagesHTML + loadingHTML + errorHTML;

  if (status === 'error') {
    document.getElementById('retry-msg')?.addEventListener('click', () => {
      const { messages: currentMsgs } = getState();
      const lastUser = [...currentMsgs].reverse().find(m => m.role === 'user');
      if (lastUser) handleSubmit({ preventDefault: () => {} });
    });
  }

  container.scrollTop = container.scrollHeight;
}
