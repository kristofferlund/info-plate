import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestWeather } from '../service/actions';

class Weather extends Component {
	constructor(props) {
		super(props);
		this.updateCurrentWeather = this.updateCurrentWeather.bind(this);
		this.state = {};
	}

	componentDidMount() {
		this.updateCurrentWeather();
	}

	render() {
		return (
			<div className="flex-column">
				<span>Weather</span>
				{this.props.currentWeather.loading ?
					<span>loading</span> :
					<span>{this.props.currentWeather.data ?
						<div className="flex-column">
							{this.props.currentWeather.data.name}
						</div>
						: ''}
					</span>
				}
			</div>
		);
	}

	updateCurrentWeather() { // eslint-disable-line
		this.props.requestWeather();
	}
}

Weather.propTypes = {
	currentWeather: PropTypes.object,
	requestWeather: PropTypes.func,
};

const mapStateToProps = state => ({
	currentWeather: state.weather.currentWeather,
});

const mapDispatchToProps = dispatch => ({
	requestWeather: payload => dispatch(requestWeather(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps, null)(Weather);
