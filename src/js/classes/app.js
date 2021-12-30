import { sidebar, $unitButtons } from '../selectors.js';
import { handleSidebar } from '../functions.js';
import { getCurrentWeather } from '../currentWeather.js';
import { getWeeklyInfo } from '../weeklyWeather.js';
import { handleUnits } from '../tempetureUnit.js';

class App {
	constructor() {
		document.addEventListener('DOMContentLoaded', () => {
			sidebar.addEventListener('click', handleSidebar);
		});

		getCurrentWeather();
		getWeeklyInfo();
		for (const $unitBtn of $unitButtons) {
			const unit = $unitBtn.dataset.unit;
			$unitBtn.addEventListener('click', () => handleUnits(unit));
		}
	}
}

export default App;
