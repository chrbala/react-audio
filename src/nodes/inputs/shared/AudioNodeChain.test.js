import test from 'tape'

import AudioNodeChain from './AudioNodeChain'

class Node {
	constructor(number) {
		if (!Number.isInteger(number))
			throw new Error('Node requires an integer parameter!')

		this.previous = null
		this.next = null
		this.number = number
	}

	connect(nextNode) {
		if (this.next)
			throw new Error('Nodes can only be connected to one child at a time!')

		this.next = nextNode
		nextNode.previous = this
	}

	disconnect(node) {
		if (!this.previous && !this.next)
			throw new Error('Can not disconnect when not connected')

		if (this.previous && (!node || this.previous == node)) {
			this.previous.next = null
			this.previous = null
		} if (this.next && (!node || this.next == node)) {
			this.next.previous = null
			this.next = null
		}
	}
}

const init = count => {
	var audioNodeChain = new AudioNodeChain()
	for (var i = 0; i < count; i++)
		audioNodeChain.push(new Node(i))

	return audioNodeChain
}

const checkChain = (t, audioNodeChain, expected) => {
	const chain = type => {
		var actual = []
		var otherType = type == 'next' ? 'previous' : 'next'
		var node = audioNodeChain.chain[type == 'next' ? 0 : audioNodeChain.chain.length - 1]
		if (node) 
			t.equal(node[otherType], null, `Check start point`)

		while (node) {
			actual[type == 'next' ? 'push' : 'unshift'](node.number)
			node = node[type]
		}

		if (node)
			t.equal(node[otherType], null, 'Check end point')

		return actual
	}

	const array = audioNodeChain.chain.map(({number}) => number)
	
	t.deepEqual(chain('next'), expected, 'Check next connections')
	t.deepEqual(chain('previous'), expected, 'Check previous connections')
	t.deepEqual(array, expected, 'Check chain')
}

test('Can connect nodes', t => {
	var one = new Node(1)
	var two = new Node(2)

	t.equal(one.number, 1)
	t.equal(two.number, 2)

	t.equal(one.next, null)
	one.connect(two)
	
	t.equal(one.next, two)
	t.equal(two.previous, one)

	t.end()
})

test('Can get the first and last last nodes', t => {
	var audioNodeChain = new AudioNodeChain()
	var first = new Node(0)
	var last = new Node(1)

	audioNodeChain.chain = [ first, last ]
	t.equal(audioNodeChain.first(), first)
	t.equal(audioNodeChain.last(), last)

	t.end()
})

test('Can initialize a node chain', t => {
	var count = 3
	var audioNodeChain = init(count)
	checkChain(t, audioNodeChain, [0, 1, 2])
	
	t.end()
})

test('Can insert nodes', t => {
	var count = 5
	var audioNodeChain = init(count)
	var node = new Node(99)
	audioNodeChain._insert(node, 2)

	var expected = [0, 1, 99, 2, 3, 4]
	checkChain(t, audioNodeChain, expected)
	t.end()
})

test('Can remove nodes by position', t => {
	var count = 5
	var audioNodeChain = init(count)
	var node = audioNodeChain.remove(2)

	var expected = [0, 1, 3, 4]
	checkChain(t, audioNodeChain, expected)
	t.equal(node.number, 2)
	t.end()
})

test('Can remove nodes by reference', t => {
	var count = 5
	var index = 2
	var audioNodeChain = init(count)
	var node = audioNodeChain.chain[index]
	var _node = audioNodeChain.remove(node)

	var expected = [0, 1, 3, 4]
	checkChain(t, audioNodeChain, expected)
	t.equal(node, _node)
	t.equal(node.number, index)
	t.end()
})

test('Can move nodes', t => {
	var count = 5
	var audioNodeChain = init(count)
	var { chain } = audioNodeChain
	var zero = chain[0]
	audioNodeChain.move(zero, chain.length - 1)

	var expected = [1, 2, 3, 4, 0]
	checkChain(t, audioNodeChain, expected)
	t.end()
})

test('Can move nodes up', t => {
	var count = 5
	var audioNodeChain = init(count)
	var { chain } = audioNodeChain
	var three = chain[3]
	audioNodeChain.moveUp(three)

	var expected = [0, 1, 3, 2, 4]
	checkChain(t, audioNodeChain, expected)
	t.end()
})

test('Can move nodes down', t => {
	var count = 5
	var audioNodeChain = init(count)
	var { chain } = audioNodeChain
	var two = chain[2]
	audioNodeChain.moveDown(two)

	var expected = [0, 1, 3, 2, 4]
	checkChain(t, audioNodeChain, expected)
	t.end()
})
