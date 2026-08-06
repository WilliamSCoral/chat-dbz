const STORAGE_KEY = 'dbz-chat-histories';

function getAllHistories() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (_) {
    return {};
  }
}

export function saveHistory(characterId, messages, history) {
  try {
    const all = getAllHistories();
    all[characterId] = { messages, history, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (_) {}
}

export function loadHistory(characterId) {
  try {
    const all = getAllHistories();
    return all[characterId] ?? null;
  } catch (_) {
    return null;
  }
}

export function clearHistory(characterId) {
  try {
    const all = getAllHistories();
    delete all[characterId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (_) {}
}

export function hasHistory(characterId) {
  return loadHistory(characterId) !== null;
}
