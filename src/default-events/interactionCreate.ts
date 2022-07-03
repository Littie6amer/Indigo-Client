import { Interaction } from "discord.js";
import { ClientEventBase } from "../bases/ClientEventBase";
import { Client } from "../lib/Client";

export default class Event extends ClientEventBase {
    constructor() {
        super({ name: "interactionCreate" })
    }

    execute(client: Client, interaction: Interaction): void {
        if (interaction.isChatInputCommand()) client.slashCommandManager.runSlashCommand(interaction.commandName, interaction)
    }
}