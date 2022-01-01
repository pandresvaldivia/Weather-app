import { searchMenu, body } from './selectors.js';

function handleSidebar(action = 'open') {
	if (action === 'open') {
		searchMenu.classList.add('is-open');
		body.style.overflowY = window.innerWidth <= 1000 ? 'hidden' : 'auto';

		return;
	}

	searchMenu.classList.remove('is-open');
	body.style.overflowY = 'auto';
}

export { handleSidebar };
