export function getUserMessage(error) {
  if (error.code === 'NO_RESULTS') return 'No se encontraron personajes.';
  if (error.message?.includes('HTTP 404')) return 'Recurso no encontrado (404).';
  if (error.message?.includes('HTTP 5')) return 'Error en el servidor. Intentá de nuevo.';
  if (error.name === 'TypeError') return 'Sin conexión a internet.';
  return 'Ocurrió un error inesperado.';
}

export function showView(viewId, activePath) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('view--active'));

  const target = document.getElementById(viewId);
  if (target) target.classList.add('view--active');

  document.querySelectorAll('.navbar__link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === activePath);
  });

  const routeDisplay = document.getElementById('route-display');
  if (routeDisplay) routeDisplay.textContent = window.location.pathname;
}
