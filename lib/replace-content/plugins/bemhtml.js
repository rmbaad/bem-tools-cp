'use strict';
const bemNaming = require('bem-naming');
const esprima = require('esprima');
const escodegen = require('escodegen');

module.exports = (content, from, to) => {
	from = bemNaming.stringify(from);
	to = bemNaming.stringify(to);

	const parsedContent = esprima.parse(content);
	const calleeArgs = parsedContent.body[0].expression.callee.arguments;
	calleeArgs.reduce((prev, current) => {
		if (current.value === from) {
			current.value = to;
			prev.push(current);
		}

		return prev;
	}, []);

	return new Promise((resolve, reject) => {
		resolve(escodegen.generate(parsedContent));
	});
};
