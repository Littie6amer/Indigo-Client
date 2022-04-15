import { Interaction } from "discord.js";
import { ClientEventBase } from "../bases/ClientEventBase";
import { BootClient } from "../lib/BootClient";

export default class Event extends ClientEventBase {
    constructor() {
        super({ name: "interactionCreate" })
    }

    execute(client: BootClient, interaction: Interaction): void {
        if (interaction.isCommand()) client.slashCommandManager.runSlashCommand(interaction.commandName, interaction)
    }
}