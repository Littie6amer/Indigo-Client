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
    missingPermissionsEmbed(target: User, permissions: (keyof PermissionFlags)[]) {
        return new EmbedBuilder()
            .setAuthor({ name: target.username, iconURL: target.avatarURL()||undefined })
            .setDescription(`${target.tag} is missing a few permissions.`)
            .addFields({ name: "Missing Permissions", value: permissions.map(p => `> ${p}`).join("\n")})
            .setColor(this.client.embedColor)
    }
}