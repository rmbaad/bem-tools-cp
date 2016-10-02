'use strict';
const bemNaming = require('bem-naming');
const postcss = require('postcss');

module.exports = (content, from, to) => {
	from = bemNaming.stringify(from);
	to = bemNaming.stringify(to);

	return new Promise((resolve, reject) => {
		return postcss().process(content)
			.then(function(output) {
				// TODO: remove empty nodes

				var newNodes = [];
				output.root.nodes.forEach((node) => {
					node.selector = node.selector.replace(`.${from}`,`.${to}`);
					newNodes.push(node);
				});
				output.root.nodes = newNodes;
				resolve(output.root.toResult());
			});
	});
};
