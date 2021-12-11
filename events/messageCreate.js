const commandInterface = require('../modules/commandInterface')
const mentionMessage = require('../modules/mentionMessage')

module.exports = (client, message) => {
    message.client = client

    commandInterface(message); mentionMessage(message, "You mentioned me!")

    // Your code here
}