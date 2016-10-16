import AudioNode from './shared/AudioNode';

export default class WaveShaper extends AudioNode {
	componentWillMount() {
		var { audioContext } = this.context;
		if (audioContext.createWaveShaper)
			this.node = audioContext.createWaveShaper();
		else
			console.error('WaveShaper not supported in this browser');
	}
}

const defaultCurve = (amount => {
	var k = typeof amount === 'number' ? amount : 50,
		n_samples = 44100,
		curve = new Float32Array(n_samples),
		deg = Math.PI / 180,
		i = 0,
		x;
	for ( ; i < n_samples; ++i ) {
		x = i * 2 / n_samples - 1;
		curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
	}
	return curve;
})(400);

WaveShaper.defaultProps = {
	curve: defaultCurve,
	oversample: 'none',
};
