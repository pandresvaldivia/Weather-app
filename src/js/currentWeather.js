import { getWeatherInfo } from './services/weather.js';
import { getCoordinates } from './services/geolocation.js';
import { $temp, $tempF, $name, $city, $icon, $date } from './selectors.js';
import {
	formatTemp,
	formatIconUrl,
	formatDate,
	formatFahrenheit,
	formatCurrentInfo,
} from './utils/format-data.js';

async function getCurrentWeather() {
	const { latitude, longitude, error } = await getCoordinates();

	if (error) return new Error(error.message);

	const weatherData = await getWeatherInfo(latitude, longitude);

	if (weatherData.error) return new Error(weatherData.error);

	configData(weatherData);
}

function configData(data) {
	const { city, temp, description, icon } = formatCurrentInfo(data);

	printIcon(icon);
	printData($temp, formatTemp(temp));
	printData($tempF, formatTemp(formatFahrenheit(temp)));
	printData($name, description);
	printData($city, city);
	printData($date, formatDate(new Date().getTime()));
}

function printData($elem, data) {
	$elem.innerText = data;
}

function printIcon(icon) {
	$icon.src = formatIconUrl(icon);
}

export { getCurrentWeather, configData };
