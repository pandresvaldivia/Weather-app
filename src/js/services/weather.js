import axios from 'axios';

const key = process.env.APIKEY;

async function getWeatherInfo(lat, lon, range = 'weather') {
	try {
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/${range}?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
		);

		return { ...data, error: false };
	} catch {
		return { error: 'We can not get weather information fron the API' };
	}
}

export { getWeatherInfo };
