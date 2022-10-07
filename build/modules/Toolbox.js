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
}
exports.Toolbox = Toolbox;
