const ms = require('ms')

module.exports = (message) => {
    const client = message.client
    const { prefixes } = require('../data/config.json')
    prefixes.push([`<@${client.user.id}>`, `<@!${client.user.id}>`])

    message.channel.myPermissions = message.guild.me.permissionsIn(message.channel.id)

    // Return if bot or no message content
    if (message.author.bot || !message.content) return

    // Check channel permissions
    if (!message.channel.myPermissions.has('SEND_MESSAGES')) return

    let args, command;

    // Go through prefixes
    for (prefix in prefixes) {

        prefix = prefixes[prefix]
        if (message.content.startsWith(prefix)) {

            // Remove the prefix from content
            let content = message.content.slice(prefix.length)[0] == ' ' ? message.content.slice(prefix.length + 1) : message.content.slice(prefix.length);
            if (!content) return

            // Define Arguments
            args = content.split(' ')[1] ? content.split(' ').slice(1) : []

            // Find command
            let commandName = content.split(' ')[0].toLowerCase();
            command = client.commands.find(c => c.names.includes(commandName))

        }

    }

    // Run the command
    if (command) {
        // Check if the command restriction allows the author to run the command
        if (typeof client.restrictions[command.restriction] == "object" && !client.restrictions[command.restriction].includes(message.author.id)) return

        // Check if there is a cooldown
        const cooldown = client.cooldowns[message.author.id] ? client.cooldowns[message.author.id][command.names[0]] : null

        if (cooldown && Date.now() - cooldown < command.cooldown) {
            return message.reply({content: `You can use this command again in ${ms(command.cooldown - (Date.now() - cooldown), {long: true})}`})
        }

        // Run the command
        const toolbox = { message, args, client }
        command.execute(toolbox)

        // Add a cooldown
        if (command.cooldown) {
            const time = Date.now()
            client.cooldowns[message.author.id] = client.cooldowns[message.author.id]||{}
            client.cooldowns[message.author.id][command.names[0]] = time

            // Delete the cooldown after it ends
            setTimeout(() => {
                if (client.cooldowns[message.author.id] && client.cooldowns[message.author.id][command.names[0]] == time) delete client.cooldowns[message.author.id][command.names[0]]
            }, command.cooldown)
        }
    }
}