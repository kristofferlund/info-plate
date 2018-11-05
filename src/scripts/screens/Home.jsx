import React, { Component } from 'react';
import {
	BigWatch,
	SpeechInput,
	VoiceLogger,
	Weather,
} from '../components/index';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="content-wrapper">
				<BigWatch />
				<Weather />
				<SpeechInput />
				<VoiceLogger />
			</div>
		);
	}
}

export default Home;
