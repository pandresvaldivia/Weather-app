import { sidebar } from '../selectors.js';
import { handleSidebar } from '../functions.js';
import { getCurrentWeather } from '../currentWeather.js';

class App {
	constructor() {
		document.addEventListener('DOMContentLoaded', () => {
			sidebar.addEventListener('click', handleSidebar);
		});

		getCurrentWeather();
	}
}

export default App;
