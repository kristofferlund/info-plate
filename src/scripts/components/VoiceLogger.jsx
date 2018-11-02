import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class VoiceLogger extends Component {
	constructor(props) {
		super(props);
		this.addLoggedCommand = this.addLoggedCommand.bind(this);
		this.state = {
			latestVoiceCommand: {
				command: null,
				time: null,
			},
			loggedCommands: [],
			open: false,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.latestVoiceCommand.time !== prevState.latestVoiceCommand.time) {
			return {
				latestVoiceCommand: nextProps.latestVoiceCommand,
			};
		}
		return null;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.latestVoiceCommand.time !== this.state.latestVoiceCommand.time) {
			this.addLoggedCommand(this.state.latestVoiceCommand);
		}
	}

	render() {
		return (
			<div className={`voice-logger-container ${this.state.open ? 'open' : 'closed'}`}>
				<div className="toggle-open" onClick={() => this.setState({ open: !this.state.open })}>
					{ this.state.open ? '>' : '<' }
				</div>
				<div className="inner-container flex-column">
					<span>Voice command log</span>
					{this.state.loggedCommands.length > 0 ?
						<div className="log-window flex-column">
							{this.state.loggedCommands.map((command, index) => (
								<span key={index}>
									<i>
										{command.time.getHours() < 10 ? `0${command.time.getHours()}` : command.time.getHours()}:
										{command.time.getMinutes() < 10 ? `0${command.time.getMinutes()}` : command.time.getMinutes()}:
										{command.time.getSeconds() < 10 ? `0${command.time.getSeconds()}` : command.time.getSeconds()}
									</i>: {command.command}
								</span>
							))}
						</div>
						:
						<div className="log-window">
							<i>No commands logged</i>
						</div>
					}
				</div>
			</div>
		);
	}

	addLoggedCommand(cmd) {
		const list = this.state.loggedCommands;
		this.setState({
			loggedCommands: list.concat(cmd),
		});
	}
}

VoiceLogger.propTypes = {
	latestVoiceCommand: PropTypes.shape({
		command: PropTypes.string,
		time: PropTypes.instanceOf(Date),
	}),
};

const mapStateToProps = state => ({
	latestVoiceCommand: state.voiceCommands.latestVoiceCommand,
});

export default connect(mapStateToProps, null)(VoiceLogger);
