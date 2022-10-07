"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandContext = void 0;
const discord_js_1 = require("discord.js");
class CommandContext {
    constructor(interaction) {
        var _a, _b;
        this.interaction = interaction;
        this.id = interaction.id;
        this.me = (_a = this.interaction.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(((_b = interaction.client.user) === null || _b === void 0 ? void 0 : _b.id) || "");
    }
    checkPermissions(type, options) {
        var _a;
        const channel = options.channel || this.interaction.channel;
        let { member, permissions: need_permissions } = options;
        // @ts-ignore
        const has_permissions = type == "Guild" ? member.permissions : channel.permissionsFor(member.id);
        need_permissions = need_permissions.filter(p => !has_permissions.has(p));
        if (!need_permissions.length)
            return true;
        const embed = new discord_js_1.EmbedBuilder()
            .setAuthor({ name: `${member.user.username} - Missing Permissions!` })
            .setDescription(`Missing permissions in ${type == "Guild" ? (_a = this.interaction.guild) === null || _a === void 0 ? void 0 : _a.name : `<#${channel === null || channel === void 0 ? void 0 : channel.id}>`}`)
            .setFields([{
                name: "Missing:",
                value: need_permissions.join(" ")
            }])
            .setColor(this.interaction.client.embedColor);
        this.interaction.reply({ embeds: [embed] }).catch();
        return false;
    }
}
exports.CommandContext = CommandContext;
