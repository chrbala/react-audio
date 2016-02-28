import AudioNode from './shared/AudioNode'

export default class BiquadFilter extends AudioNode {
	componentWillMount() {
		var { audioContext } = this.context
		if (audioContext.createBiquadFilter)
			this.node = audioContext.createBiquadFilter()
		else
			console.error('BiquadFilter not supported in this browser')
	}
}

module.exports.defaultProps = {
	frequency: 350,
	detune: 0,
	Q: 1,
	gain: 0,
	type: 'lowpass'
}