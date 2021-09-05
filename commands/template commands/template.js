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
                new MessageEmbed().setAuthor(`${user.username} [ #${user.discriminator} ]`).setDescription(`Click the buttons below to view the page\non ${user.username} for many botlists.`).addField('Please Note', 'If this bot doesn\'t have a page. nothing will show up.').setThumbnail(user.avatarURL()).setColor(0xbf943d)
            ], 
            components: [
                new MessageActionRow().addComponents(
                    new MessageButton()
                        .setLabel('Github')
                        .setURL(`https://top.gg/bot/${user.id}`)
                        .setStyle('LINK'), 
                )
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('templateSelect')
                        .setPlaceholder('Pick an option...')
                        .addOptions({label: `Option 1`, value: "opt1"}, {label: `Option 2`, value: "opt2"}),
                )
            ]})
        
    }
}