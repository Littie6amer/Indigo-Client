import { ValueOption, SlashCommand, SubCommandOption } from "../../lib/index.js"
import { CommandInteraction, MessageEmbed } from "discord.js"

const slashCommand = new SlashCommand({
    name: "embed",
    description: "Create an embed!",
})

slashCommand.setOptions([
    new SubCommandOption({ name: "quote", description: "Create an embed quote of yourself.", execute: (interaction) => {
        const embed = new MessageEmbed()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL()||undefined})
            .setDescription(`${interaction.options.getString("text")}`)
            .setColor("GREEN")
        interaction.reply({ embeds: [embed] })
    }}).setOptions([
        new ValueOption({ name: "text", type: "STRING", description: "Embed Description" }).setRequired(),
    ]),
])

export default [slashCommand]
