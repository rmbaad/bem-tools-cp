'use strict';
const bemNaming = require('bem-naming');

module.exports = (content, from, to) => {
	from = bemNaming.stringify(from);
	to = bemNaming.stringify(to);


	const newContent = content.replace(new RegExp(from, 'g'), to);

	return new Promise((resolve, reject) => {
		resolve(newContent);
	});
};
