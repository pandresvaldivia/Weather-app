import {
	$openBtn,
	$closeBtn,
	$unitButtons,
	$searchBtn,
	$currentLocationBtn,
} from '../selectors.js';
import { handleSidebar } from '../functions.js';
import { getCurrentWeather } from '../currentWeather.js';
import { getWeeklyInfo } from '../weeklyWeather.js';
import { handleUnitClick } from '../tempetureUnit.js';
import { searchWeatherPlace } from '../services/search.js';
import { createDatabase } from '../services/storeLocations.js';

class App {
	constructor() {
		this.setEventListeners();
		this.getLocalInfo();
		createDatabase();

		$searchBtn.addEventListener('click', searchWeatherPlace);
		for (const $unitBtn of $unitButtons) {
			const unit = $unitBtn.dataset.unit;
			$unitBtn.addEventListener('click', () => handleUnitClick(unit, $unitBtn));
		}
	}

	getLocalInfo() {
		getCurrentWeather();
		getWeeklyInfo();
	}

	setEventListeners() {
		const _this = this;

		$openBtn.addEventListener('click', () => handleSidebar());
		$closeBtn.addEventListener('click', () => handleSidebar('close'));
		$currentLocationBtn.addEventListener('click', _this.getLocalInfo);
	}
}

export default App;
