import { Embed, EmbedBuilder, PermissionFlags, User } from "discord.js";
import { Client } from "../lib/Client"

export class Toolbox {
    client: Client;
    constructor(options: { client: Client }) {
        this.client = options.client
    }
    simpleEmbed(text: string) {
        return new EmbedBuilder()
            .setColor(this.client.embedColor)
            .setDescription(text)
    }
}