const { prefixes } = require('../data/config.json')
const {MessageButton, MessageActionRow, MessageSelectMenu, MessageEmbed} = require('discord.js')

module.exports = async (client, interaction) => {
    
    if (interaction.customId == 'templateSelect') {
        interaction.deferUpdate();
        const channel = interaction.message.channel
        if (!channel) return
        const m = await channel.messages.fetch(interaction.message.id)
            
        if (interaction.values[0] == 'opt1') m.edit({content: "Option 1", embeds: [], components: []})
        if (interaction.values[0] == 'opt2') m.edit({content: "Option 2", embeds: [], components: []})
    }

}