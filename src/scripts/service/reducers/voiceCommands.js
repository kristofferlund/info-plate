import { SET_VOICE_COMMAND } from '../constants';

const initialState = {
	latestVoiceCommand: null,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
	case SET_VOICE_COMMAND:
		return Object.assign({}, state, {
			latestVoiceCommand: action.command,
		});
	default:
		return state;
	}
}
