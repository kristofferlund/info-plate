import React, { Component } from 'react';
import {
	BigWatch,
	SpeechInput,
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
			</div>
		);
	}
}

export default Home;
