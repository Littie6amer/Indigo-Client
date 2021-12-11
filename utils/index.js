const config = require('../data/config.json');

Command = require('./commandBase')

simpleEmbed = (title, description, color) => {
    return { description, author: { name: title }, color: config.colors[color] ? config.colors[color] : color }
}

module.exports = { Command, simpleEmbed, config }