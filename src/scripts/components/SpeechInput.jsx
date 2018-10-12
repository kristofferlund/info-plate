import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import XMLHttpRequest from 'xmlhttprequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';

class SpeechInput extends Component {
	constructor(props) {
		super(props);
		let compatible = true;
		if (!window.webkitSpeechRecognition) { // eslint-disable-line
			compatible = false;
			console.info(this.props.textUnsupported);
		}
		this.transcribe = this.transcribe.bind(this);
		this.processRecognition = this.processRecognition.bind(this);
		this.setupRecognition = this.setupRecognition.bind(this);
		this.recognition = null;
		this.wordTranscriptions = props.data || {};
		this.state = {
			recognized: '',
			transcribed: '',
			compatible,
			isRecording: false,
		};
	}

	componentDidMount() {
		if (this.state.compatible) {
			if (this.props.dataPath) {
				const xhr = new XMLHttpRequest();
				xhr.open('get', this.props.dataPath, true);
				xhr.onreadystatechange = () => {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							this.wordTranscriptions = JSON.parse(xhr.responseText);
						} else {
							console.log('error');
						}
					}
				};
				xhr.send();
			}
			this.setupRecognition();
		}
	}

	render() {
		return (
			<div className="flex-column align-center">
				{this.state.compatible ? '' : this.props.textUnsupported}
				<button onClick={() => this.beginRecognition()}>
					<FontAwesomeIcon icon={faMicrophoneAlt} />
				</button>
			</div>
		);
	}

	setupRecognition() {
		const recognition = new webkitSpeechRecognition(); // eslint-disable-line
		recognition.continuous = true;
		recognition.interimResults = false;
		recognition.onend = this.finishRecognition.bind(this);
		recognition.onresult = this.finishRecognition.bind(this);
		this.recognition = recognition;
	}

	transcribe(recognized) {
		// check if the whole string is in the dictionary
		const noSpaces = recognized.replace(/\s/g, '').toUpperCase();
		if (this.wordTranscriptions[noSpaces]) {
			if (this.props.wrapTokens) {
				return this.props.wrapTokens.replace('%s', this.wordTranscriptions[noSpaces]);
			}
			return this.wordTranscriptions[noSpaces];
		}

		// check words
		const buffer = [];
		recognized.split(' ').forEach((word) => {
			if (!word) { buffer.push(' '); return; }
			const wordUpper = word.toUpperCase();

			// check if word is in the dictionary
			let transcribed = this.wordTranscriptions[wordUpper];

			// if all uppercase, it's probably an acronym
			if (!transcribed && word === wordUpper) {
				transcribed = '';
				for (let i = 0; i < word.length; i += 1) {
					// append the transcription for each letter-word
					transcribed += this.wordTranscriptions[word.charAt(i)] || word.charAt(i);
				}
			}

			// wrap known tokens
			// console.log('do we wrap', transcribed, this.props.wrapTokens);
			if (transcribed && this.props.wrapTokens) {
				console.log('wrapping tokens', transcribed, this.props.wrapTokens);
				transcribed = this.props.wrapTokens.replace('%s', transcribed);
			}

			// wrap unknown tokens
			if (!transcribed && this.props.wrapUnknown) {
				console.log('wrapping unknown', word, this.props.wrapUnknown);
				word = this.props.wrapUnknown.replace('<','&lt;').replace('>','&gt;').replace('%s', word); // eslint-disable-line
			}

			buffer.push(transcribed || word);
		});
		return buffer.join(' ');
	}

	processRecognition(event) {
		if (!event.results) {
			this.setState({
				recognized: 'error',
				transcribed: '',
			});
		} else {
			const recognized = event.results[event.results.length - 1][0].transcript;
			const transcribed = this.transcribe(recognized);
			this.setState({
				recognized: event.results.length === 1 ? recognized : this.state.recognized + recognized,
				transcribed: event.results.length === 1 ? transcribed : this.state.transcribed + transcribed,
			});
			console.log('Transcribed message: ', transcribed);

			if (transcribed === 'finish voice command') {
				this.finishRecognition();
			}

			if (this.props.onTranscription) {
				this.props.onTranscription.call(null, recognized, transcribed);
			}
		}
	}

	finishRecognition() {
		console.log('Voice command ended');
		this.recognition.onend = null;
		this.recognition.onresult = null;
		this.recognition.stop();
		this.setState({
			isRecording: false,
		});
	}

	beginRecognition() {
		if (this.state.isRecording) {
			this.finishRecognition();
		} else {
			this.recognition.onresult = this.processRecognition.bind(this);
			this.recognition.onend = this.finishRecognition.bind(this);
			this.recognition.start();
			this.setState({
				isRecording: true,
			});
		}
	}
}

SpeechInput.propTypes = {
	data: PropTypes.object,
	dataPath: PropTypes.string,
	onTranscription: PropTypes.func,
	textUnsupported: PropTypes.string,
	wrapTokens: PropTypes.string,
	wrapUnknown: PropTypes.string,
};

SpeechInput.defaultProps = {
	textUnsupported: 'Your browser does not support Speech Recognition.',
	wrapTokens: '',
	wrapUnknown: '',
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps, null)(SpeechInput);
