import { $itemContainer, $tempContainer } from './selectors.js';

function handleUnitClick(unit, $button) {
	handleUnits(unit);
	handleSelectedButton($button);
}

function handleUnits(unit) {
	if (unit === 'F') {
		$itemContainer.classList.add('is-fahrenheit');
		$tempContainer.classList.add('is-fahrenheit');
		return;
	}
	$itemContainer.classList.remove('is-fahrenheit');
	$tempContainer.classList.remove('is-fahrenheit');
}

function handleSelectedButton($btn) {
	const $selectedBtn = document.querySelector(
		'.measurementUnits-option[aria-selected="true"]'
	);

	$selectedBtn.ariaSelected = false;
	$btn.ariaSelected = true;
}

export { handleUnitClick };
