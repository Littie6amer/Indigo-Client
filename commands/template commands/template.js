const messageCreate = require("../../events/messageCreate")
const utils = require('../../utils')
const {MessageButton, MessageActionRow, MessageSelectMenu, MessageEmbed} = require('discord.js')

module.exports = {
    name: "template",
    aka: [],
    description: "Template command.",
    args: "",
    async run (toolbox) {
        const {message} = toolbox

            message.channel.send({embeds: [
                new MessageEmbed().setAuthor(`Template Command`).setDescription(`Template Description`).setColor(0x0e0e0e)
            ], 
            components: [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId('templateSelect')
                        .setPlaceholder('Pick an option...')
                        .addOptions({label: `Option 1`, value: "opt1"}, {label: `Option 2`, value: "opt2"}),
                )
            ]})
        
    }
}