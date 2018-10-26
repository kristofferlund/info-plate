import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAdjust, // find another icon
	faBolt,
	faCloud,
	faSnowflake,
	faSun,
	faTint,
	faUmbrella,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
	requestWeather,
	startWeatherStream,
} from '../service/actions';

const weatherGroup = {
	Thunderstorm: faBolt,
	Drizzle: faTint,
	Rain: faUmbrella,
	Snow: faSnowflake,
	Atmosphere: faAdjust,
	Clear: faSun,
	Clouds: faCloud,
};

class Weather extends Component {
	constructor(props) {
		super(props);
		this.updateCurrentWeather = this.updateCurrentWeather.bind(this);
		this.state = {};
	}

	componentDidMount() {
		this.updateCurrentWeather();
		this.props.startWeatherStream();
	}

	componentWillReceiveProps(nextProps) {
		console.log('next props: ', nextProps);
		if (nextProps.latestVoiceCommand === 'update weather') {
			console.log('updating weather');
			this.updateCurrentWeather();
		}
	}

	render() {
		return (
			<div className="flex-column">
				{this.props.currentWeather.loading ?
					<span>loading</span> :
					<span>{this.props.currentWeather.data ?
						<div className="flex-column">
							<span>{this.props.currentWeather.data.name}</span>
							<span>
								<FontAwesomeIcon icon={weatherGroup[this.props.currentWeather.data.weatherData.main]} />
							</span>
							<i>{this.props.currentWeather.data.weatherData.description}</i>
						</div>
						: ''}
					</span>
				}
			</div>
		);
	}

	updateCurrentWeather() {
		this.props.requestWeather();
	}
}

Weather.propTypes = {
	currentWeather: PropTypes.object,
	latestVoiceCommand: PropTypes.string,
	requestWeather: PropTypes.func,
	startWeatherStream: PropTypes.func, // eslint-disable-line
};

const mapStateToProps = state => ({
	currentWeather: state.weatherData.currentWeather,
	latestVoiceCommand: state.latestVoiceCommand,
});

const mapDispatchToProps = dispatch => ({
	requestWeather: payload => dispatch(requestWeather(payload)),
	startWeatherStream: () => dispatch(startWeatherStream()),
});

export default connect(mapStateToProps, mapDispatchToProps, null)(Weather);
