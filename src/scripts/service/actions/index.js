import {
	REQUEST_WEATHER,
	START_WEATHER_STREAM,
	SWITCH_THEME,
} from '../constants';

// Actions can easily be written a one-liners

export const requestWeather = () => ({ type: REQUEST_WEATHER });
export const startWeatherStream = () => ({ type: START_WEATHER_STREAM });

export const switchTheme = theme => ({ type: SWITCH_THEME, theme });
