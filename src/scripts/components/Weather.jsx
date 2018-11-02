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
		this.getNewWeatherData = this.getNewWeatherData.bind(this);
		this.state = {
			latestVoiceCommand: {
				command: '',
				time: null,
			},
			weatherGroup: null,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.latestVoiceCommand.command === 'update weather') {
			const pingLimit = 5000;
			if (!prevState.latestVoiceCommand.time || (new Date() - prevState.latestVoiceCommand.time) > pingLimit) {
				return {
					latestVoiceCommand: nextProps.latestVoiceCommand,
				};
			}
			console.warn('Stop spamming!');
			return null;
		}
		if (nextProps.currentWeather.data && (nextProps.currentWeather.data.weatherData.main !== prevState.weatherGroup)) {
			return {
				weatherGroup: nextProps.currentWeather.data.weatherData.main,
			};
		}
		return null;
	}

	componentDidMount() {
		this.getNewWeatherData();
		this.props.startWeatherStream();
	}

	componentDidUpdate(prevProps, prevState) {
		if ((this.state.latestVoiceCommand.command === 'update weather') && this.state.latestVoiceCommand !== prevState.latestVoiceCommand) {
			this.getNewWeatherData();
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

	getNewWeatherData() {
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
