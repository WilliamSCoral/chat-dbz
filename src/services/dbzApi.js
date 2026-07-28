import { fetchJson } from '../api.js';
import { toCharacterProfile } from '../transform/character.js';

const DBZ_API = 'https://dragonball-api.com/api';

const SELECTED = ['Goku', 'Vegeta', 'Gohan', 'Freezer', 'Bulma', 'Majin'];

function buildCharactersUrl({ limit = 58 } = {}) {
  const params = new URLSearchParams({ limit: String(limit) });
  return `${DBZ_API}/characters?${params.toString()}`;
}

export async function getCharacters() {
  const url = buildCharactersUrl({ limit: 58 });
  const data = await fetchJson(url);

  const result = [];
  for (const name of SELECTED) {
    const raw = data.items.find(c => c.name.includes(name));
    if (raw) result.push(toCharacterProfile(raw));
  }

  if (result.length === 0) {
    const err = new Error('No se encontraron personajes');
    err.code = 'NO_RESULTS';
    throw err;
  }

  return result;
}
