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
