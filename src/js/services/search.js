import {
	$searchInput,
	$itemContainer,
	$highlightContent,
} from '../selectors.js';
import { getWeatherPlaceInfo } from './weather.js';
import { configData } from '../currentWeather.js';
import { getTimeWeather, printWeeklyData } from '../weeklyWeather.js';
import { addLocation } from './storeLocations.js';

async function searchWeatherPlace(e) {
	e.preventDefault();
	const place = $searchInput.value.trim();

	try {
		const location = await printCurrentWeather(place);

		await printWeeklyWeather(place);

		addLocation(location);
	} catch (error) {
		console.error(error);
	}
}

async function printCurrentWeather(place) {
	const info = await getWeatherPlaceInfo(place);

	if (info.error) throw new Error(info.error);

	const location = configData(info);

	return location;
}

async function printWeeklyWeather(place) {
	const { list, error } = await getWeatherPlaceInfo(place, 'forecast');

	if (error) throw new Error(error);

	const weeklyList = getTimeWeather(list);
	clearData();
	printWeeklyData(weeklyList);
}

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

export { searchWeatherPlace };
