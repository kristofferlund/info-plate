import {
	REQUEST_WEATHER,
	SWITCH_THEME,
} from '../constants';

// Actions can easily be written a one-liners

export const requestWeather = () => ({ type: REQUEST_WEATHER });

export const switchTheme = theme => ({ type: SWITCH_THEME, theme });
