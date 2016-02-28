import AudioNode from './shared/AudioNode'

export default class DynamicsCompressor extends AudioNode {
	componentWillMount() {
		var { audioContext } = this.context
		if (audioContext.createDynamicsCompressor)
			this.node = audioContext.createDynamicsCompressor()
		else
			console.error('DynamicsCompressor not supported in this browser')
	}
}

module.exports.defaultProps = {
	threshold: -24,
	knee: 30,
	ratio: 12,
	reduction: 0,
	attack: 0.003,
	release: 0.25
}