import { days, months } from '../constants.js';

function formatTemp(temp) {
	return `${temp.toFixed()}`;
}

function formatIconUrl(filename) {
	return `./assets/images/${filename}.png`;
}

function formatDate(miliseconds) {
	const date = new Date(miliseconds);

	const day = date.getDate();
	const weekday = days[date.getDay()];
	const month = months[date.getMonth()];

	return `${weekday}. ${day} ${month}`;
}

export { formatTemp, formatIconUrl, formatDate };
