import { Interaction } from "discord.js";
import { ClientEventBase } from "../bases/ClientEventBase";
import { Client } from "../lib/Client";

export default class Event extends ClientEventBase {
    constructor(client: Client) {
        super(client, { name: "interactionCreate" })
    }

    execute(interaction: Interaction): void {
        if (interaction.isChatInputCommand()) this.client.commandManager.run(interaction.commandName, interaction)
    }
}