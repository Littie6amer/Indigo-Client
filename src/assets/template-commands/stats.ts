import { SlashCommand, SubCommandOption } from "../../lib/index.js"
import { CommandInteraction } from "discord.js"

const slashCommand = new SlashCommand({
    name: "ping",
    description: "Get the bot's ping!",
    execute: (interaction, toolbox) => interaction.reply({ content: `${interaction.client.ws.ping}` }),
})

export default [slashCommand]
