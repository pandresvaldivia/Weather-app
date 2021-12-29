import { sidebar } from '../selectors.js';
import { handleSidebar } from '../functions.js';
import { getCurrentWeather } from '../currentWeather.js';
import { getWeeklyInfo } from '../weeklyWeather.js';

class App {
	constructor() {
		document.addEventListener('DOMContentLoaded', () => {
			sidebar.addEventListener('click', handleSidebar);
		});

		getCurrentWeather();
		getWeeklyInfo();
	}
}

export default App;
