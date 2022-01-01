import { createDomElement } from './utils/dom.js';
import { $locationList } from './selectors.js';

function getLocationTemplate({ city, country }) {
	return `
        <button class="optionsList-option">
            <span>${city}, ${country}</span><i class="icon-right"></i>
        </button>
    `;
}

function printLocation(data) {
	const locationTemplate = getLocationTemplate(data);
	const location = createDomElement(locationTemplate);

	$locationList.appendChild(location);
}

function clearLocations() {
	while ($locationList.firstElementChild) {
		$locationList.firstElementChild.remove();
	}
}

export { printLocation, clearLocations };
