import { BootClient, ClientEvent } from "../../lib/index.js";
import { Interaction, CommandInteraction } from "discord.js";

const event = new ClientEvent("interactionCreate", (client: BootClient, interaction: Interaction) => {
    if (interaction.isCommand()) {
        client.runSlashCommand(interaction.commandName, interaction)
    }
})

export default event