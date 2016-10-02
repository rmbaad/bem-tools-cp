'use strict';
const bemNaming = require('bem-naming');
const css = require('css');
const postcss = require('postcss');

module.exports = (content, from, to) => {
	from = bemNaming.stringify(from);
	to = bemNaming.stringify(to);

	const postCssPlugins = [
		require('precss')
	];

	return new Promise((resolve, reject) => {
		return postcss(postCssPlugins).process(content, {parser: require('postcss-scss')})
			.then(function(output) {
				// TODO: remove empty nodes
				output.root.nodes.reduce((prev, current) => {
					current.selector = current.selector.replace(`.${from}`,`.${to}`);
					prev.push(current);

					return prev;
				}, []);

				resolve(output.css);
			});
	});
};
