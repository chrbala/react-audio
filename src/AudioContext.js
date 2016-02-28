import React, { Component } from 'react'

var Context = window.AudioContext || window.webkitAudioContext

export default class AudioContextComponent extends Component {
	componentWillMount() {
		if (this.props.audioContext)
			return

		if (Context)
			this.audioContext = new Context()
		else {
			console.error('AudioContext not supported in this browser')
			this.audioContext = {}
		}
	}

	componentWillUnmount() {
		if (this.audioContext)
			this.audioContext.close()
	}

	getChildContext() {
		return { audioContext: this.props.audioContext || this.audioContext }
	}

	render() {
		return <div>{this.props.children}</div>
	}
}

AudioContextComponent.childContextTypes = {
	audioContext: React.PropTypes.any.isRequired
}