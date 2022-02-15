import { SlashCommand, SubCommandOption } from "../../lib/index.js"
import { CommandInteraction } from "discord.js"

const slashCommand = new SlashCommand({
    name: "stats",
    description: "General Bot Statitics",
    execute: (interaction, toolbox) => {
        interaction.reply({ content: `${toolbox}` })
        console.log(interaction.client)
    },
})

export default [slashCommand]
