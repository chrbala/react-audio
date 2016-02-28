# react-audio

This is a low-level React wrapper around the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

## Usage
```javascript
import { 
  Oscillator,
  BiquadFilter,
  Delay,
  DynamicsCompressor,
  StereoPanner,
  Gain,
  WaveShaper,
  Analyser,
  Destination
} from 'react-audio'

// in a React render()
<Oscillator>
  <Gain />
  <BiquadFilter />
  <DynamicsCompressor />
  <StereoPanner />
  <Delay />
  <WaveShaper />
  <Analyser>
    <SomeVisualizerComponent />
  </Analyser>
  <Destination />
</Oscillator>
```
The components set the AudioNode properties via props. See the Mozilla documentation for details.

The default props are set to the Web Audio API defaults, with the exception of WaveShaper, which provides the example curve shown in the Mozilla documentation.

## Analyser
The Analyser provides exposes thinly wrapped ``getFloatFrequencyData``, ``getByteFrequencyData``, ``getFloatTimeDomainData``, and ``getByteTimeDomainData`` from the Web Audio API AnalyserNode as props to its children. These functions return the data in the proper array types as follows:

* getFloatFrequencyData: Float32Array
* getByteFrequencyData: Uint8Array
* getFloatTimeDomainData: Float32Array
* getByteTimeDomainData: Uint8Array

``frequencyBinCount`` is also exposed from the AnalyserNode via props.

## Roadmap

* Support dynamic AudioNode ordering - currently AudioNodes are pushed to the end of the AudioNode chain when added. This works as expected with a static AudioNode chain, but may give unexpected results when changed at runtime.
* Support more of the Web Audio API. Right now only oscillators, filters, the analyser node, and a simple output are supported.
* ConvolverNode is not currently supported.