import React, { Component } from 'react';

import update from '../../shared/update';

export default class AudioNode extends Component {
	componentDidMount() {
		var { node } = this;
		var { audioNodeChain } = this.context;

		audioNodeChain.push(node);

		update.call(this);
	}

	componentDidUpdate() {
		update.call(this);
	}

	componentWillUnmount() {
		var { node } = this;
		var { audioNodeChain } = this.context;

		audioNodeChain.remove(node);

		node.disconnect();
	}

	render() {
		return <div />;
	}
}

AudioNode.contextTypes = {
	audioContext: React.PropTypes.any.isRequired,
	audioNodeChain: React.PropTypes.any.isRequired,
};
