import AudioNode from './shared/AudioNode'

export default class Analyser extends AudioNode {
	componentWillMount() {
		var { audioContext } = this.context
		if (audioContext.createAnalyser) {
			var node = this.node = audioContext.createAnalyser()
			
			this.getFloatFrequencyData = () => {
				if (!this.floatFrequencyData)
					this.floatFrequencyData = new Float32Array(node.frequencyBinCount)

				var data = this.floatFrequencyData
				node.getFloatFrequencyData(data)
				return data
			}

			this.getByteFrequencyData = () => {
				if (!this.byteFrequencyData)
					this.byteFrequencyData = new Uint8Array(node.frequencyBinCount)

				var data = this.byteFrequencyData
				node.getByteFrequencyData(data)
				return data
			}

			this.getFloatTimeDomainData = () => {
				if (!this.floatTimeDomainData)
					this.floatTimeDomainData = new Float32Array(node.fftSize)

				var data = this.floatTimeDomainData
				node.getFloatTimeDomainData(data)
				return data
			}

			this.getByteTimeDomainData = () => {
				if (!this.byteTimeDomainData)
					this.byteTimeDomainData = new Uint8Array(node.fftSize)

				var data = this.byteTimeDomainData
				node.getByteTimeDomainData(data)
				return data
			}
		}
		else
			console.error('Analyser not supported in this browser')
	}

	render() {
		var { frequencyBinCount } = this.node

		var props = {
			getFloatFrequencyData: this.getFloatFrequencyData,
			getByteFrequencyData: this.getByteFrequencyData,
			getFloatTimeDomainData: this.getFloatTimeDomainData,
			getByteTimeDomainData: this.getByteTimeDomainData,
			frequencyBinCount
		}

		return <div>{React.Children.map(this.props.children, m =>
			React.cloneElement(m, props)
		)}</div>
	}
}

module.exports.defaultProps = {
	fftSize: 2048,
	minDecibels: -100,
	maxDecibels: -30,
	smoothingTimeConstant: 0.8
}