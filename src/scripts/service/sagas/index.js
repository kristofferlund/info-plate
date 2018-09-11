import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
	apiKey,
	cityCode,
} from '../variables';
import {
	RECEIVE_WEATHER,
	REQUEST_WEATHER,
} from '../constants';

/** *********************************************************** */
/** ********************** Callers *************************** */
/** *********************************************************** */

const weatherApi = `http://api.openweathermap.org/data/2.5/weather?id=${cityCode}&APPID=${apiKey}`;

function callWeatherApi() {
	return fetch(weatherApi)
		.then(res => res.json())
		.then(data => (data))
		.catch((ex) => {
			console.warn('Parsing failed: ', ex);
			return ({ ex });
		});
}

/** *********************************************************** */
/** ********************** FETCHERS *************************** */
/** *********************************************************** */

function* fetchWeather() {
	try {
		const response = yield call(callWeatherApi);
		if (response) {
			yield put({
				type: RECEIVE_WEATHER,
				response,
			});
		}
	} catch (err) {
		console.warn('Saga failed with response: ', err);
	}
}

/** *********************************************************** */
/** ********************** WATCHERS *************************** */
/** *********************************************************** */
/*
  Use saga helpers to decide how to react to an action, like 'takeLatest' or 'takeAll'
  Read more about this here: https://redux-saga.js.org/docs/api/
*/

function* watchWeatherRequest() {
	yield takeLatest(REQUEST_WEATHER, fetchWeather);
}

export default function* rootSaga() {
	yield all([
		fork(watchWeatherRequest),
	]);
}
