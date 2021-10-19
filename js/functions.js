import { searchMenu, body } from './selectors.js';

function handleSidebar(e) {
	const element = e.target;
	if (
		element.classList.contains('handleMenu') ||
		element.classList.contains('icon-close')
	) {
		const isOpen = searchMenu.classList.toggle('is-open');
		body.style.overflowY =
			isOpen && window.innerWidth <= 1000 ? 'hidden' : 'auto';
	}
}

export { handleSidebar };
