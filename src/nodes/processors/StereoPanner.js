import AudioNode from './shared/AudioNode';

export default class StereoPanner extends AudioNode {
	componentWillMount() {
		var { audioContext } = this.context;
		if (audioContext.createStereoPanner)
			this.node = audioContext.createStereoPanner();
		else
			console.error('StereoPanner not supported in this browser');
	}
}

module.exports.defaultProps = {
	pan: 0,
};
