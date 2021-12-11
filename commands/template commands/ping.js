const { Command } = require("../../utils");

const command = module.exports = new Command()

command.create('ping')
    .setExecute(execute)
    .makeSlashCommand()

function execute(toolbox) {
    const request = toolbox.message||toolbox.interaction
    request.reply(`Pong! \`${toolbox.client.ws.ping}ms\``)
}