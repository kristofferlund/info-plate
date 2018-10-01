import React, { Component } from 'react';

class BigWatch extends Component {
	constructor(props) {
		super(props);
		this.tick = this.tick.bind(this);
		const date = new Date();
		this.state = {
			date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
			hour: date.getHours(),
			minute: date.getMinutes(),
		};
	}

	componentDidMount() {
		this.intervalID = setInterval(
			() => this.tick(),
			1000,
		);
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	render() {
		return (
			<div className="flex-column">
				<h1>
					{ this.state.hour }:
					{ this.state.minute < 10 ? '0' : '' }
					{ this.state.minute }
				</h1>
				<span>
					{ this.state.date }
				</span>
			</div>
		);
	}

	tick() {
		const d = new Date();
		this.setState({
			date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
			hour: d.getHours(),
			minute: d.getUTCMinutes(),
		});
	}
}

export default BigWatch;
