import {
	REQUEST_WEATHER,
	RECEIVE_WEATHER,
} from '../constants';

const initialState = {
	currentWeather: {
		data: null,
		loading: false,
	},
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
	case REQUEST_WEATHER:
		// If you want to use loading indicators,
		// create a loading bool that toggle when request is initiated
		return Object.assign({}, state, {
			currentWeather: {
				loading: true,
			},
		});
	case RECEIVE_WEATHER:
		// If you are using an API you are not able to change,
		// you can format the responses to fit your needs here
		console.log('response:', action.response);
		return Object.assign({}, state, {
			currentWeather: {
				data: {
					weatherData: action.response.weather[0],
					name: action.response.name,
				},
				loading: false,
			},
		});
	default:
		return state;
	}
}
