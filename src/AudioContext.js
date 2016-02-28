import React, { Component } from 'react'

var context = window.AudioContext || window.webkitAudioContext

export default class AudioContextComponent extends Component {
	componentWillMount() {
		if (context)
			this.audioContext = new context()
		else {
			console.error('AudioContext not supported in this browser')
			this.audioContext = {}
		}
	}

	componentWillUnmount() {
		this.audioContext.close()
	}

	getChildContext() {
		return { audioContext: this.audioContext }
	}

	render() {
		return <div>{this.props.children}</div>
	}
}

AudioContextComponent.childContextTypes = {
	audioContext: React.PropTypes.any.isRequired
}