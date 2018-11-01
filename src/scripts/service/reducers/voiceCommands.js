import { SET_VOICE_COMMAND } from '../constants';

const initialState = {
	latestVoiceCommand: {
		command: null,
		time: null,
	},
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
	case SET_VOICE_COMMAND:
		console.log('Update voice command', action.command);
		return Object.assign({}, state, {
			latestVoiceCommand: {
				command: action.command,
				time: new Date(),
			},
		});
	default:
		return state;
	}
}
