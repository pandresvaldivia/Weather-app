import { createDomElement } from './utils/dom.js';
import { getWeatherPlace } from './services/search.js';
import { $locationList } from './selectors.js';

function getLocationTemplate({ city, country }) {
	return `
        <button class="optionsList-option" data-city="${city}">
            <span>${city}, ${country}</span><i class="icon-right"></i>
        </button>
    `;
}

function printLocation(data) {
	const locationTemplate = getLocationTemplate(data);
	const $location = createDomElement(locationTemplate);
	$location.addEventListener('click', () => getWeatherPlace(data.city));

	$locationList.appendChild($location);
}

function clearLocations() {
	while ($locationList.firstElementChild) {
		$locationList.firstElementChild.remove();
	}
}

export { printLocation, clearLocations };
