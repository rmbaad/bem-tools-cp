'use strict';
const fs = require('fs');
const path = require('path');
const bemNaming = require('bem-naming');

module.exports = (tech, sourcePath, destinationPath) => {
    return new Promise((resolve, reject) => {
        const techReplace = require(`./plugins/${tech}`);
        fs.readFile(destinationPath, 'UTF-8', (err, content) => {
            if (err) {
                reject();
            }

            const sourceEntity = bemNaming.parse(path.basename(sourcePath).split('.')[0]);
            const destinationEntity = bemNaming.parse(path.basename(destinationPath).split('.')[0]);

            techReplace(content, sourceEntity, destinationEntity)
                .then((content) => {
                    fs.writeFile(destinationPath, content, 'UTF-8', () => {
                        resolve();
                    });
                });
        });
    });
};
