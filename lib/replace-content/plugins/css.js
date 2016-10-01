'use strict';
const bemNaming = require('bem-naming');

module.exports = function(content, from, to) {
    from = bemNaming.stringify(from);
    to = bemNaming.stringify(to);
    const newContent = content.replace(from, to);

    return new Promise((resolve, reject) => {
        resolve(newContent);
    });
};
