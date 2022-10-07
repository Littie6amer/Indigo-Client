import { Channel, CommandInteraction, EmbedBuilder, GuildMember, PermissionFlags } from "discord.js";
import { Client } from "../lib/Client";

export class CommandContext {
    interaction: CommandInteraction;
    id: string;
    me: GuildMember;
    constructor(interaction: CommandInteraction) {
        this.interaction = interaction;
        this.id = interaction.id
        this.me = this.interaction.guild?.members.cache.get(interaction.client.user?.id||"") as GuildMember
    }

    checkPermissions (type: "Guild" | "Channel", options: { member: GuildMember, channel?: Channel, permissions: (keyof PermissionFlags)[] }): (true | false) {
        const channel = options.channel || this.interaction.channel
        let { member, permissions: need_permissions } = options

        // @ts-ignore
        const has_permissions = type == "Guild" ? member.permissions : channel.permissionsFor(member.id)
        need_permissions = need_permissions.filter(p => !has_permissions.has(p))
        
        if (!need_permissions.length) return true;

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${member.user.username} - Missing Permissions!` })
            .setDescription(`Missing permissions in ${type == "Guild" ? this.interaction.guild?.name : `<#${channel?.id}>`}`)
            .setFields([{
                name: "Missing:",
                value: need_permissions.join(" ")
            }])
            .setColor((this.interaction.client as Client).embedColor)
        this.interaction.reply({ embeds: [embed] }).catch()
        return false
    }
}