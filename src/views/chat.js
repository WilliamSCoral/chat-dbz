import { showView, getUserMessage } from '../utils.js';
import { getState, setState } from '../state.js';
import { createSystemPrompt, buildPayload, normalizeAIResponse } from '../services/aiService.js';
import { appendUserMessage, appendAssistantMessage, getTrimmedHistory, resetHistory } from '../chat/history.js';
import { apiFetch } from '../chat/apiFetch.js';

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function renderChat() {
  showView('view-chat', '/chat');

  const character = JSON.parse(sessionStorage.getItem('character') || 'null');

  if (character) {
    document.querySelector('.chatHeader__avatar').src = character.image;
    document.querySelector('.chatHeader__avatar').alt = character.name;
    document.querySelector('.chatHeader__name').textContent = character.name;
    document.querySelector('.chatHeader__status').textContent = 'En línea';
  }

  const { characterHistories } = getState();
  const saved = character && characterHistories[character.id];
  const restoredMessages = saved ? saved.messages : [];
  const restoredHistory = saved ? saved.history : resetHistory();

  setState({ status: 'idle', messages: restoredMessages, history: restoredHistory, character, error: null });
  renderMessages();

  const form = document.querySelector('.chatComposer');
  const newForm = form.cloneNode(true);
  form.replaceWith(newForm);
  const debouncedSubmit = debounce(handleSubmit, 300);
  newForm.addEventListener('submit', (e) => {
    e.preventDefault();
    debouncedSubmit(e);
  });
}

async function handleSubmit(e) {
  if (e?.preventDefault) e.preventDefault();

  const { status, messages, history, character } = getState();
  if (status === 'loading') return;

  const input = document.querySelector('.chatInput');
  const sendBtn = document.querySelector('.chatSend');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  sendBtn.disabled = true;

  const systemPrompt = createSystemPrompt(character);
  const newHistory = appendUserMessage(history, text);
  const uiMessages = [...messages, { role: 'user', content: text }];

  setState({ status: 'loading', messages: uiMessages, history: newHistory });
  renderMessages();

  try {
    const raw = await callAI(newHistory, systemPrompt);
    const responseText = normalizeAIResponse(raw);
    const updatedHistory = appendAssistantMessage(newHistory, responseText);
    const updatedMessages = [...uiMessages, { role: 'character', content: responseText }];

    const { characterHistories } = getState();
    setState({
      status: 'success',
      messages: updatedMessages,
      history: updatedHistory,
      characterHistories: {
        ...characterHistories,
        [character.id]: { messages: updatedMessages, history: updatedHistory },
      },
    });

  } catch (error) {
    if (error.status === 429) {
      const seconds = error.retryAfterSeconds ?? 5;
      setState({ status: 'loading', error: `Límite alcanzado. Reintentando en ${seconds}s...` });
      renderMessages();
      await wait(seconds * 1000);

      try {
        const raw = await callAI(newHistory, systemPrompt);
        const responseText = normalizeAIResponse(raw);
        const updatedHistory = appendAssistantMessage(newHistory, responseText);
        const updatedMessages = [...uiMessages, { role: 'character', content: responseText }];
        const { characterHistories } = getState();
        setState({
          status: 'success',
          messages: updatedMessages,
          history: updatedHistory,
          characterHistories: {
            ...characterHistories,
            [character.id]: { messages: updatedMessages, history: updatedHistory },
          },
        });
      } catch (retryError) {
        setState({ status: 'error', error: getUserMessage(retryError) });
      }
    } else {
      setState({ status: 'error', error: getUserMessage(error) });
    }
  } finally {
    sendBtn.disabled = false;
    renderMessages();
    const container = document.querySelector('.chatMessages');
    if (container) container.scrollTop = container.scrollHeight;
  }
}

async function callAI(history, systemPrompt) {
  const trimmed = getTrimmedHistory(history);
  const payload = buildPayload(trimmed, systemPrompt);
  return apiFetch(payload);
}

function renderMessages() {
  const { status, messages, error } = getState();
  const container = document.querySelector('.chatMessages');

  if (status === 'idle' && messages.length === 0) {
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
        <p class="stateEmoji">⚠️</p>
        <p>${error}</p>
      </div>
    </div>
  ` : '';

  container.innerHTML = messagesHTML + loadingHTML + errorHTML;
  container.scrollTop = container.scrollHeight;
}
