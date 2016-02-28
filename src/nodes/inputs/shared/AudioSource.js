import React, { Component } from 'react'

import update from '../../shared/update'

import AudioNodeChain from './AudioNodeChain'

export default class AudioSource extends Component {
	constructor() {
		super()
		this.audioNodeChain = new AudioNodeChain()
	}

	getChildContext() {
		var { audioNodeChain } = this
		return { audioNodeChain }
	}

	componentWillMount() {
		var { node, audioNodeChain } = this
		audioNodeChain.setSource(node)
		update.call(this)
	}

	componentDidUpdate() {
		update.call(this)
	}

	componentWillUnmount() {
		var { node } = this
		this.audioNodeChain.remove(node)
	}

	render() {
		return <div>{this.props.children}</div>
	}
}

AudioSource.childContextTypes = {
	audioNodeChain: React.PropTypes.any.isRequired
}

AudioSource.contextTypes = {
	audioContext: React.PropTypes.any.isRequired
}