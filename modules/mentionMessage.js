module.exports = (message, messageData) => {
    const client = message.client

    // Return if bot or no message content
    if (message.author.bot || !message.content) return

    // Check channel permissions
    if (!message.channel.myPermissions.has('SEND_MESSAGES')) return

    // Check that the bot was mentioned and that was it
    if (![`<@${client.user.id}>`, `<@!${client.user.id}>`].includes(message.content.toLowerCase())) return

    message.reply(messageData)

}