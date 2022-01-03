import { searchMenu, body } from './selectors.js';

function handleSidebar(action = 'open') {
	if (action === 'open') {
		searchMenu.classList.add('is-open');
		scrollUp();
		body.style.overflowY = window.innerWidth <= 800 ? 'hidden' : 'auto';
		return;
	}

	searchMenu.classList.remove('is-open');
	body.style.overflowY = 'auto';
}

function scrollUp() {
	window.scrollTo(0, 0);
}

export { handleSidebar };
