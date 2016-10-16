import AudioNode from './shared/AudioNode';

export default class Delay extends AudioNode {
	componentWillMount() {
		var { audioContext } = this.context;
		if (audioContext.createDelay)
			this.node = audioContext.createDelay();
		else 
			console.error('Delay not supported in this browser');
	}
}

module.exports.defaultProps = {
	delayTime: 0,
};
