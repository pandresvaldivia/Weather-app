import { printLocation, clearLocations } from '../location.js';

let db;

function indexedDBSupport() {
	return 'indexedDB' in window;
}

function createDatabase() {
	if (!indexedDBSupport())
		throw new Error("Your browser doesn't support IndexedBD");

	const request = window.indexedDB.open('locations', 1);

	request.onerror = (e) => {
		console.error(`IndexedDB error: ${e.target.errorCode}`);
	};
	request.onsuccess = (e) => {
		db = request.result;
		getLocations();
	};

	request.onupgradeneeded = (e) => {
		const db = e.target.result;
		const objectStore = db.createObjectStore('location', {
			keyPath: 'city',
		});
		objectStore.createIndex('city', 'city', { unique: true });
		objectStore.createIndex('country', 'country', { unique: false });
	};
}

async function addLocation(location) {
	const isStored = await locationExists(location.city);

	if (isStored) return;

	const locationsNumber = await countData();

	if (locationsNumber >= 10) await deleteLocation();

	const request = db
		.transaction('location', 'readwrite')
		.objectStore('location')
		.add(location);

	request.onsuccess = (e) => {
		clearLocations();
		getLocations();
	};

	request.onerror = (err) => {
		console.error(`Error to add new location: ${err}`);
	};
}

function deleteLocation() {
	return new Promise(async (resolve) => {
		const { key } = await getFirstLocation();

		const request = db
			.transaction('location', 'readwrite')
			.objectStore('location')
			.delete(key);

		request.onsuccess = () => {
			resolve();
		};
	});
}

function getLocations() {
	const objectStore = db.transaction('location').objectStore('location');

	objectStore.openCursor().onsuccess = (e) => {
		const cursor = e.target.result;

		if (!cursor) return;

		printLocation(cursor.value);

		cursor.continue();
	};
}

function getFirstLocation() {
	return new Promise((resolve) => {
		const objectStore = db.transaction('location').objectStore('location');

		const request = objectStore.openCursor();

		request.onsuccess = () => {
			const cursor = request.result;

			if (cursor) {
				resolve(cursor);
			}
		};

		request.onerror = (e) => {
			reject(e);
		};
	});
}

function locationExists(city) {
	return new Promise((resolve, reject) => {
		const request = db
			.transaction('location')
			.objectStore('location')
			.get(city);

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = (err) => {
			reject(`Error to get student information: ${err}`);
		};
	});
}

function countData() {
	return new Promise((resolve, reject) => {
		const request = db.transaction('location').objectStore('location').count();

		request.onsuccess = () => {
			console.log(request.result);
			resolve(request.result);
		};

		request.onerror = (err) => {
			reject(`Error to get the number of data: ${err}`);
		};
	});
}

export { addLocation, createDatabase };
