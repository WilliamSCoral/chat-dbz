import { showView } from '../utils.js';
import { getCharacters } from '../api.js';
import { navigateTo } from '../router.js';

export async function renderHome() {
  showView('view-home', '/');

  const container = document.querySelector('.characters');

  container.innerHTML = `
    <div class="state state--loading">
      <div class="stateContent">
        <p class="stateEmoji">⏳</p>
        <h2>Cargando personajes...</h2>
      </div>
    </div>
  `;

  try {
    const characters = await getCharacters();

    container.innerHTML = characters.map(char => `
      <div class="character-card-wrapper">
        <div class="character-card" data-id="${char.id}" data-name="${char.name}" data-image="${char.image}">
          <img class="character-card__avatar" src="${char.image}" alt="${char.name}" />
        </div>
        <span class="character-card__name">${char.name}</span>
      </div>
    `).join('');

    container.querySelectorAll('.character-card').forEach(card => {
      card.addEventListener('click', () => {
        const { id, name, image } = card.dataset;
        sessionStorage.setItem('character', JSON.stringify({ id, name, image }));
        navigateTo('/chat');
      });
    });

  } catch (error) {
    container.innerHTML = `
      <div class="state state--error">
        <div class="stateContent">
          <p class="stateEmoji">⚠️</p>
          <h2>No se pudieron cargar los personajes</h2>
          <p>${error.message}</p>
          <button class="stateRetry" id="retry-home">Reintentar</button>
        </div>
      </div>
    `;
    document.getElementById('retry-home')?.addEventListener('click', renderHome);
  }
}
