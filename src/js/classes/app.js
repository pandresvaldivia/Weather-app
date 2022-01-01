import { $openBtn, $closeBtn, $unitButtons, $searchBtn } from '../selectors.js';
import { handleSidebar } from '../functions.js';
import { getCurrentWeather } from '../currentWeather.js';
import { getWeeklyInfo } from '../weeklyWeather.js';
import { handleUnitClick } from '../tempetureUnit.js';
import { searchWeatherPlace } from '../services/search.js';
import { createDatabase } from '../services/storeLocations.js';

class App {
	constructor() {
		document.addEventListener('DOMContentLoaded', () => {
			$openBtn.addEventListener('click', () => handleSidebar());
			$closeBtn.addEventListener('click', () => handleSidebar('close'));
		});

		createDatabase();
		getCurrentWeather();
		getWeeklyInfo();
		$searchBtn.addEventListener('click', searchWeatherPlace);
		for (const $unitBtn of $unitButtons) {
			const unit = $unitBtn.dataset.unit;
			$unitBtn.addEventListener('click', () => handleUnitClick(unit, $unitBtn));
		}
	}
}

export default App;
