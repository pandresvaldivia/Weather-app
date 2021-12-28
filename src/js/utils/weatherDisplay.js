import { createDomElement } from './dom.js';
import { getCurrentWeather } from '../currentWeather.js';

function printCurrentWheather() {
	const test = getCurrentWeather();
	console.log(test);
}
