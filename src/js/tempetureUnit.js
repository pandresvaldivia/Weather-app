import { $itemContainer } from './selectors.js';

function handleUnits(unit) {
	unit === 'F'
		? $itemContainer.classList.add('is-fahrenheit')
		: $itemContainer.classList.remove('is-fahrenheit');
}

export { handleUnits };
