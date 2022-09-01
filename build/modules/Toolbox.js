"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolbox = void 0;
const discord_js_1 = require("discord.js");
class Toolbox {
    constructor(options) {
        this.client = options.client;
    }
    simpleEmbed(text) {
        return new discord_js_1.EmbedBuilder()
            .setColor(this.client.embedColor)
            .setDescription(text);
    }
    missingPermissionsEmbed(target, permissions) {
        return new discord_js_1.EmbedBuilder()
            .setAuthor({ name: target.username, iconURL: target.avatarURL() || undefined })
            .setDescription(`${target.tag} is missing a few permissions.`)
            .addFields({ name: "Missing Permissions", value: permissions.map(p => `> ${p}`).join("\n") })
            .setColor(this.client.embedColor);
    }
}
exports.Toolbox = Toolbox;
