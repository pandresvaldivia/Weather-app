import { sidebar } from '../selectors.js';
import { handleSidebar } from '../functions.js';

class App {
	constructor() {
		document.addEventListener('DOMContentLoaded', () => {
			sidebar.addEventListener('click', handleSidebar);
		});
	}
}

export default App;
