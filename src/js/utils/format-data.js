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

	return `${weekday}, ${day} ${month}`;
}

function formatVisibility(visibility) {
	visibility = (visibility / 1609.344).toFixed(1).replace('.', ',');
	return visibility;
}

function formatWindSpeed(speed) {
	return speed.toFixed();
}

function formatWindDirection(deg) {
	if (deg === 0) {
		return 'N';
	}
	if (deg <= 22.5) {
		return 'NNE';
	}
	if (deg <= 45) {
		return 'NE';
	}
	if (deg <= 67.5) {
		return 'ENE';
	}
	if (deg <= 90) {
		return 'E';
	}
	if (deg <= 112.5) {
		return 'ESE';
	}
	if (deg <= 135) {
		return 'SE';
	}
	if (deg <= 157.5) {
		return 'SSE';
	}
	if (deg <= 180) {
		return 'S';
	}
	if (deg <= 202.5) {
		return 'SSW';
	}
	if (deg <= 225) {
		return 'SW';
	}
	if (deg <= 247.5) {
		return 'WSW';
	}
	if (deg <= 270) {
		return 'W';
	}
	if (deg <= 292.5) {
		return 'WNW';
	}
	if (deg <= 315) {
		return 'NW';
	}

	return 'NNW';
}

function formatFahrenheit(grades) {
	return grades * (9 / 5) + 32;
}

export {
	formatTemp,
	formatIconUrl,
	formatDate,
	formatVisibility,
	formatWindDirection,
	formatWindSpeed,
	formatFahrenheit,
};
