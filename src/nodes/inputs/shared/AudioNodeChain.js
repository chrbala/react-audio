export default class AudioNodeChain {
	constructor() {
		this.chain = [];
		this.hasSource = false;
		this.hasDestination = false;
	}

	_nodeExists(node, method) {
		if (!node)
			throw new Error(`Nodes must be provided to ${method}`);
	}

	source() {
		if (!this.hasSource)
			return null;

		return this.chain[0];
	}

	destination() {
		if (!this.hasDestination)
			return null;

		return this.chain[this.chain.length];
	}

	setSource(node) {
		this._nodeExists(node, 'setSource');

		if (this.hasSource)
			throw new Error('Only one source allowed per AudioNodeChain');

		this.unshift(node);
		this.hasSource = true;
	}

	setDestination(node) {
		this._nodeExists(node, 'setDestination');

		if (this.hasDestination)
			throw new Error('Only one destination allowed per AudioNodeChain');

		this.push(node);
		this.hasSource = true;
	}

	first() {
		var index;

		if (this.hasSource)
			index = 1;
		index = 0;

		return this.chain[index];
	}

	last() {
		var index;

		if (this.hasDestination)
			index = this.chain.length - 2;
		index = this.chain.length - 1;

		return this.chain[index];
	}

	push(node) {
		this._nodeExists(node, 'push');

		var last = this.last();
		if (last)
			last.connect(node);
		return this.chain.push(node);
	}

	pop() {
		var node = this.chain.pop();
		if (node)
			node.disconnect();
		return node;
	}

	shift() {
		var node = this.chain.shift();
		if (node)
			node.disconnect();
		return node;
	}

	unshift(node) {
		this._nodeExists(node, 'unshift');

		var first = this.first();
		var source = this.source();

		if (source) {
			source.disconnect();
			source.connect(node);
		}
		if (first)
			node.connect(first);

		return this.chain.unshift(node);
	}

	_insert(node, position) {
		var max = this.chain.length;
		if (this.hasSource)
			position++;
		if (this.hasDestination)
			max--;

		if (!Number.isInteger(position) || position < 0)
			throw new Error(`Node can not be inserted in position ${position}`);
		if (position > max)
			throw new Error(`Node inserted at ${position}, which is above the maximum of ${max}`);

		var previous = this.chain[position - 1];
		var next = this.chain[position];

		if (next) {
			next.disconnect(previous);
			node.connect(next);
		}
		if (previous)
			previous.connect(node);

		this.chain.splice(position, 0, node);
	}

	move(node, toIndex) {
		this.remove(node);
		this._insert(node, toIndex);
	}

	_moveByRelativePosition(node, delta) {
		var index = this._getNodeIndex(node);
		this._removeByIndex(index);
		this._insert(node, index + delta);
	}

	moveUp(node) {
		this._moveByRelativePosition(node, -1);
	}

	moveDown(node) {
		this._moveByRelativePosition(node, 1);
	}

	_removeByIndex(index) {
		if (!this.chain[index])
			throw new Error(`No node at index ${index}`);
		if (index == 0 && this.hasSource)
			this.hasSource = false;
		if (index == this.chain.length && this.hasDestination)
			this.hasDestination = false;

		var previous = this.chain[index - 1];
		var next = this.chain[index + 1];

		var [removed] = this.chain.splice(index, 1);
		removed.disconnect();

		if (previous && next)
			previous.connect(next);

		return removed;
	}

	_getNodeIndex(node) {
		var index = this.chain.findIndex(_node => _node === node);
		if (index == -1)
			throw new Error('Node not found!');
		return index;
	}

	_removeByNode(node) {
		this._nodeExists(node, 'remove');

		var index = this._getNodeIndex(node);
		return this._removeByIndex(index);
	}

	remove(arg) {
		if (typeof arg == 'number')
			return this._removeByIndex(arg);
		return this._removeByNode(arg);
	}
}
