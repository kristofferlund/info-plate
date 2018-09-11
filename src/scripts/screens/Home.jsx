import React, { Component } from 'react';
import { Weather } from './index';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="content-wrapper">
				<Weather />
			</div>
		);
	}
}

export default Home;
