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
		this.state = {
			prevLatestVoiceCommand: null, // eslint-disable-line
		};
	}

	static getDerivedStateFromProps(nextProps) {
		if (nextProps.latestVoiceCommand.command === 'update weather') {
			return {
				prevLatestVoiceCommand: nextProps.latestVoiceCommand,
			};
		}
		return null;
	}

	componentDidMount() {
		this.updateCurrentWeather();
		this.props.startWeatherStream();
	}

	componentDidUpdate(prevProps) {
		const pingLimit = 60 * 1000;
		if (this.props.latestVoiceCommand === 'update weather') {
			console.log('Latest voice command is correct');
			if ((this.props.latestVoiceCommand.time - prevProps.latestVoiceCommand.time) > pingLimit) {
				console.log('component did update and will once again');
				this.updateCurrentWeather();
			}
			console.warn('Fetching weather data has a cooldown');
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
	latestVoiceCommand: PropTypes.shape({
		command: PropTypes.string,
		time: PropTypes.instanceOf(Date),
	}),
	requestWeather: PropTypes.func,
	startWeatherStream: PropTypes.func, // eslint-disable-line
};

const mapStateToProps = state => ({
	currentWeather: state.weatherData.currentWeather,
	latestVoiceCommand: state.voiceCommands.latestVoiceCommand,
});

const mapDispatchToProps = dispatch => ({
	requestWeather: payload => dispatch(requestWeather(payload)),
	startWeatherStream: () => dispatch(startWeatherStream()),
});

export default connect(mapStateToProps, mapDispatchToProps, null)(Weather);
