import React, { Component } from 'react'

export default class AudioNode extends Component {
	componentWillMount() {
		var { destination } = this.context.audioContext
		this.node = destination
	}

	componentDidMount() {
		var { node } = this
		var { audioNodeChain } = this.context

		audioNodeChain.setDestination(node)
	}

	componentWillUnmount() {
		var { node } = this
		var { audioNodeChain } = this.context

		audioNodeChain.remove(node)

		node.disconnect()
	}

	render() {
		return <div />
	}
}

AudioNode.contextTypes = {
	audioContext: React.PropTypes.any.isRequired,
	audioNodeChain: React.PropTypes.any.isRequired
}