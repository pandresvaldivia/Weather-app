import { handleSidebar } from '../functions.js';
import { getCurrentWeather } from '../currentWeather.js';
import { getWeeklyInfo } from '../weeklyWeather.js';
import { handleUnitClick } from '../tempetureUnit.js';
import { searchWeatherPlace } from '../services/search.js';
import { createDatabase } from '../services/storeLocations.js';
import {
	$openBtn,
	$closeBtn,
	$unitButtons,
	$searchBtn,
	$currentLocationBtn,
	$app,
	$loader,
} from '../selectors.js';

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

	async getLocalInfo(loaded = false) {
		await getCurrentWeather();
		await getWeeklyInfo();

		if (!loaded) this.displayApp();
	}

	setEventListeners() {
		const _this = this;

		$openBtn.addEventListener('click', () => handleSidebar());
		$closeBtn.addEventListener('click', () => handleSidebar('close'));
		$currentLocationBtn.addEventListener('click', () =>
			_this.getLocalInfo(true)
		);
	}

	displayApp() {
		$loader.classList.add('is-hidden');
		$app.classList.remove('is-hidden');
	}
}

export default App;
