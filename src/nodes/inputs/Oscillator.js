import AudioSource from './shared/AudioSource'

export default class Oscillator extends AudioSource {
	componentWillMount() {
		var { audioContext } = this.context
		if (audioContext.createOscillator)
			this.node = audioContext.createOscillator()
		else
			console.error('Oscillator not supported in this browser')

		super.componentWillMount()
	}

	componentDidMount() {
		if (this.node)
			this.node.start()
	}
}

module.exports.defaultProps = {
	frequency: 440,
	detune: 0,
	type: 'sine'
}