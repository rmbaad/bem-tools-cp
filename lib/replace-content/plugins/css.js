'use strict';
const bemNaming = require('bem-naming');
const css = require('css');

module.exports = (content, from, to) => {
    from = bemNaming.stringify(from);
    to = bemNaming.stringify(to);

    const parsedContent = css.parse(content);
    const rules = parsedContent.stylesheet.rules;

    rules.forEach((rule) => {
        rule.selectors = rule.selectors.reduce((prev, current) => {
            prev.push(current.replace(`.${from}`,`.${to}`));

            return prev;
        }, []);
    });

    return new Promise((resolve, reject) => {
        resolve(css.stringify(parsedContent));
    });
};
