import { $itemContainer, $highlightContent } from './selectors.js';
import { createDomElement } from './utils/dom.js';
import { getWeatherInfo } from './services/weather.js';
import { getCoordinates } from './services/geolocation.js';
import {
	formatVisibility,
	formatWindDirection,
	formatTemp,
	formatDate,
	formatWindSpeed,
	formatFahrenheit,
} from './utils/format-data.js';
import { createItemInfo } from './weeklyInfo';

function getItemTemplate({
	temp_min,
	temp_max,
	temp_minF,
	temp_maxF,
	icon,
	name,
	date,
}) {
	return `
        <article class="weatherCard">
            <div class="weatherCard-description" title="${name}">
                <p class="weatherCard-date">${date}</p>
                <figure class="weatherCard-image">
                    <img src="./assets/images/${icon}.png" alt="${name}"/>
                </figure>
            </div>
            <p class="weatherCard-details">
                <span>${temp_min}°C</span><span>${temp_max}°C</span>
            </p>
            <p class="weatherCard-details">
                <span>${temp_minF}°F</span><span>${temp_maxF}°F</span>
            </p>
        </article>
    `;
}

function printWeeklyData(weeklyList) {
	weeklyList.forEach((weatherInfo, index) => {
		const item = createWeeklyItem(weatherInfo, index);
		const itemInfo = createItemInfo(weatherInfo, index);
		$itemContainer.appendChild(item);
		$highlightContent.appendChild(itemInfo);
	});
}

function createWeeklyItem(weatherInfo, index) {
	const template = getItemTemplate(weatherInfo);
	const item = createDomElement(template);

	item.addEventListener('click', () => handleItemClick(item));
	if (index === 0) item.ariaSelected = true;
	item.id = `item-${index}`;

	return item;
}

async function getWeeklyInfo() {
	const { latitude, longitude } = await getCoordinates();

	const { list, error } = await getWeatherInfo(latitude, longitude, 'forecast');

	if (error) return new Error(error);

	const weeklyList = getTimeWeather(list);

	printWeeklyData(weeklyList);
}

function configWeeklyData(data, index) {
	const { temp_min, temp_max, humidity, pressure } = data.main;
	const { icon, description: name } = data.weather[0];
	const { speed, deg } = data.wind;
	const date = data.dt;
	const visibility = data.visibility;

	return {
		date: getItemDate(date, index),
		temp_min: formatTemp(temp_min),
		temp_max: formatTemp(temp_max),
		temp_minF: formatTemp(formatFahrenheit(temp_min)),
		temp_maxF: formatTemp(formatFahrenheit(temp_max)),
		humidity,
		pressure,
		icon,
		speed: formatWindSpeed(speed),
		name,
		deg: formatWindDirection(deg),
		visibility: formatVisibility(visibility),
	};
}

function getItemDate(date, index) {
	if (index === 0) return 'Today';

	return formatDate(date * 1000);
}

function getTimeWeather(rawData) {
	const weeklyWeather = [];

	rawData.forEach((weather, index) => {
		if (index % 8 === 0) {
			weather = configWeeklyData(weather, index);
			console.log(weather);
			weeklyWeather.push(weather);
		}
	});

	return weeklyWeather;
}

function handleItemClick($item) {
	handleItem($item);
	displayItemInfo($item.id);
}

function handleItem($item) {
	const $itemSelected = document.querySelector(
		'.weatherCard[aria-selected="true"]'
	);

	$itemSelected.ariaSelected = false;
	$item.ariaSelected = true;
}

function displayItemInfo(id) {
	const $itemInfoSelected = document.querySelector(
		'.hightlightCard-container:not(.is-hidden)'
	);

	const $itemInfo = document.querySelector(
		`.hightlightCard-container[data-index="${id}"]`
	);

	$itemInfoSelected.classList.add('is-hidden');
	$itemInfo.classList.remove('is-hidden');
}

export { getWeeklyInfo };
