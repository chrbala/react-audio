import AudioNode from './shared/AudioNode';

export default class Gain extends AudioNode {
	componentWillMount() {
		var { audioContext } = this.context;
		if (audioContext.createGain)
			this.node = audioContext.createGain();
		else
			console.error('Gain not supported in this browser');
	}
}

module.exports.defaultProps = {
	value: 1,
};
