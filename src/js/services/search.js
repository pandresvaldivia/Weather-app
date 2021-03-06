import { $searchInput } from '../selectors.js';
import { getWeatherPlaceInfo } from './weather.js';
import { configData } from '../currentWeather.js';
import { getTimeWeather, printWeeklyData } from '../weeklyWeather.js';
import { addLocation } from './storeLocations.js';
import { handleSidebar } from '../functions.js';
import { clearData } from '../utils/clearData.js';
import { printAlert } from '../alert.js';

function searchWeatherPlace(e) {
	e.preventDefault();
	const place = $searchInput.value.trim();

	getWeatherPlace(place);
}

async function getWeatherPlace(place) {
	try {
		const location = await printCurrentWeather(place);

		await printWeeklyWeather(place);

		addLocation(location);

		clearInput();
		handleSidebar('close');
	} catch (error) {
		printAlert('City not found');
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

function clearInput() {
	$searchInput.value = '';
}

export { searchWeatherPlace, getWeatherPlace };
