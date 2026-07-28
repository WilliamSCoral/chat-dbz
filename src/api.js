const DBZ_API = 'https://dragonball-api.com/api';

const SELECTED = ['Goku', 'Vegeta', 'Gohan', 'Freezer', 'Bulma', 'Majin'];

export async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

export async function getCharacters() {
  const data = await fetchJson(`${DBZ_API}/characters?limit=58`);

  const result = [];
  for (const name of SELECTED) {
    const match = data.items.find(c => c.name.includes(name));
    if (match) result.push(match);
  }
  return result;
}
