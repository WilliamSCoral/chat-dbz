const STORAGE_KEY = 'dbz-theme';
const DARK = 'dark';
const LIGHT = 'light';

function applyTheme(theme) {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  if (theme === LIGHT) {
    html.setAttribute('data-theme', LIGHT);
    if (btn) btn.textContent = '☀️';
  } else {
    html.removeAttribute('data-theme');
    if (btn) btn.textContent = '🌙';
  }
}

function getSavedTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
}

export function initTheme() {
  applyTheme(getSavedTheme());

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === LIGHT;
    const next = isLight ? DARK : LIGHT;
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });
}
