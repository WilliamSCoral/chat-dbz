import { router } from './router.js';
import { setupLinkInterception } from './navigation.js';
import { initTheme } from './theme.js';

initTheme();
setupLinkInterception();
window.addEventListener('popstate', router);
router();
