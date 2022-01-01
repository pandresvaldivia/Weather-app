import { $itemContainer, $highlightContent } from '../selectors.js';

function clearData() {
	clearItems();
	clearItemsInfo();
}

function clearItems() {
	while ($itemContainer.firstElementChild) {
		$itemContainer.firstElementChild.remove();
	}
}

function clearItemsInfo() {
	while ($highlightContent.firstElementChild) {
		$highlightContent.firstElementChild.remove();
	}
}

export { clearData };
