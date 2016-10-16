export default function() {
	var { node } = this;
	var { 
		type, 
		curve, 
		oversample, 
		fftSize, 
		minDecibels, 
		maxDecibels, 
		smoothingTimeConstant, 
		...rest, 
	} = this.props;

	if (!node)
		return;

	Object.assign(node, {type, curve, oversample});
	
	for (var prop in rest)
		if (node[prop])
			node[prop].value = rest[prop];
}
