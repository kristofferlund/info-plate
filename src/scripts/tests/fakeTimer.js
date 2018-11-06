/* eslint-disable */

export default function fakeTimer(callback) {
	console.log('Ready....go!');
	setInterval(() => {
		callback && callback();
	}, 1000);
}
