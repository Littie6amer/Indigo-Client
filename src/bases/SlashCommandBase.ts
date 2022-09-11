import { Channel, channelLink, CommandInteraction, EmbedBuilder, GuildMember, PermissionFlags, PermissionsBitField } from "discord.js"
import { Client } from "../lib/Client"
import { SlashCommandOptionChannelTypes, SlashCommandOptions, SlashCommandOptionTypes, SlashCommandPermissions, SlashCommandValueOption } from "./Interfaces";

export class SlashCommandBase {
    client: Client;
    name: string;
    isSubcommand: boolean;
    description: string;
    options: SlashCommandValueOption[];
    subcommands: SlashCommandBase[];
    required_permissions?: SlashCommandPermissions;
    constructor(client: Client, options: SlashCommandOptions) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options ?? []
        this.subcommands = options.subcommands?.map(subcommand => subcommand.makeSubcommand()) ?? []
        this.isSubcommand = false
        this.required_permissions = options.permissions
    }
    async run(optionNames: string[], interaction: CommandInteraction) {
        const subcommand = optionNames.length ? this.subcommands.find(subcommand => subcommand.name == optionNames[0]) : null
        optionNames.shift()
        if (!subcommand) {
            let passed = (await this.permissionCheck(interaction)).passed && this.prechecks(interaction).passed
            if (passed) this.execute(interaction)
            else return;
        } else subcommand.run(optionNames, interaction)
    }
    async permissionCheck(interaction: CommandInteraction): Promise<{ passed: true | false }> {
        let passed = true
        if (!this.required_permissions || interaction.channel?.isDMBased()) return { passed }

        const required_author_permissions = this.required_permissions.author
        const required_bot_permissions = this.required_permissions.bot
        const author = interaction.member as GuildMember
        const bot = interaction.guild?.members.cache.get(this.client.user?.id || "") as GuildMember

        const missing_permissions: {
            [index: string]: { channel?: (keyof PermissionFlags)[], guild?: (keyof PermissionFlags)[] }
        } = {}

        const checkChannelPermissions = (member: GuildMember, perms?: (keyof PermissionFlags)[]) => {
            if (!perms?.length) return;

            // @ts-ignore
            const channel_perms = interaction.channel?.permissionsFor(member.id)
            perms = perms.filter(p => !channel_perms.has(p))

            if (!perms.length) return;

            passed = false
            missing_permissions[member.id] = { ...(missing_permissions[member.id] || {}), channel: perms }
        }

        const checkGuildPermissions = (member: GuildMember, perms?: (keyof PermissionFlags)[]) => {
            if (!perms?.length) return;

            // @ts-ignore
            const guild_perms = member.permissions
            perms = perms.filter(p => !guild_perms.has(p))

            if (!perms.length) return;

            passed = false
            missing_permissions[member.id] = { ...(missing_permissions[member.id] || {}), guild: perms }
        }

        checkGuildPermissions(author, required_author_permissions?.guild)
        checkChannelPermissions(author, required_author_permissions?.channel)
        checkGuildPermissions(bot, required_bot_permissions?.guild)
        checkChannelPermissions(bot, required_bot_permissions?.channel)

        for (let userId in missing_permissions) {
            const perms = missing_permissions[userId]
            const member = userId === bot.id ? bot : author
            const fields: {name: string, value: string}[] = []
            if (perms.guild) fields.push({ name: `${interaction.guild?.name} (This Server)`, value: "> `"+perms.guild.join("`\n> `")+"`"})
            // @ts-ignore
            if (perms.channel) fields.push({ name: `# ${interaction.channel.name} (This Channel)`, value: "> `"+perms.channel.join("`\n> `")+"`"})
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${member.user.username}` })
                .setDescription(`Missing perms.`)
                .setFields(fields)
                .setColor(this.client.embedColor)
            const message = { embeds: [embed] }
            member === bot && missing_permissions[author.id] ? (await interaction.fetchReply()).reply(message) : interaction.reply(message)
        }

        return { passed }
    }
    prechecks(interaction: CommandInteraction): { passed: true | false } {
        return { passed: true }
    }
    execute(interaction: CommandInteraction): any {
        return interaction.reply({ embeds: [this.client.toolbox.simpleEmbed("This command is missing an execute function!")] })
    }
    getData(): object {
        const { name, description, options, subcommands } = this
        const json: any = {
            name, description,
            options: [...options.map(option => this.getOptionData(option)), ...subcommands.map(subcommand => subcommand.getData())]
        }
        if (this.getType()) json.type = this.getType()
        //if (this.user_permissions.length) json.default_member_permissions = new PermissionsBitField(this.user_permissions).bitfield
        return json as object
    }
    getJSON(): object {
        const { name, description, options, subcommands } = this
        const json: any = {
            name, description,
            options: [...options.map(option => this.getOptionJSON(option)), ...subcommands.map(subcommand => subcommand.getJSON())]
        }
        if (this.getType()) json.type = this.getType()
        //if (this.user_permissions.length) json.default_member_permissions = new PermissionsBitField(this.user_permissions).bitfield
        return json as object
    }
    getOptionJSON(option: SlashCommandValueOption): object {
        const { name, description, required, choices, channel_types, min_value, max_value, autocomplete, type } = option
        const json: any = { name, description, type }
        if (required) json.required = required
        if (choices) json.choices = choices
        if (channel_types?.length) json.channel_types = channel_types
        if (min_value) json.min_value = min_value
        if (max_value) json.max_value = max_value
        if (autocomplete) json.autocomplete = autocomplete
        return json as object
    }
    getOptionData(option: SlashCommandValueOption): object {
        const { name, description, required, choices, channel_types, min_value, max_value, autocomplete } = option
        const type = this.getOptionTypeValue(option.type);
        const json: any = { name, description, type }
        if (required) json.required = required
        if (choices) json.choices = choices
        if (channel_types?.length) json.channel_types = channel_types.map(this.getOptionTypeValue)
        if (min_value) json.min_value = min_value
        if (max_value) json.max_value = max_value
        if (autocomplete) json.autocomplete = autocomplete
        return json as object
    }
    getOptionTypeValue(type: SlashCommandOptionChannelTypes | SlashCommandOptionTypes) {
        const typeValues = {
            "STRING": 3, "INTEGER": 4, "BOOLEAN": 5, "USER": 6,
            "CHANNEL": 7, "ROLE": 8, "MENTIONABLE": 9, "NUMBER": 10,
            "ATTACHMENT": 11, "GUILD_TEXT": 0, "DM": 1, "GUILD_VOICE": 2,
            "GROUP_DM": 3, "GUILD_CATEGORY": 4, "GUILD_NEWS": 5, "GUILD_NEWS_THREAD": 10,
            "GUILD_PUBLIC_THREAD": 11, "GUILD_PRIVATE_THREAD": 12, "GUILD_STAGE_VOICE": 13, "GUILD_DIRECTORY": 14,
        }
        return typeValues[type]
    }
    getType() {
        if (!this.subcommands.length && this.isSubcommand) return 1
        else if (this.subcommands.length && this.isSubcommand) return 2
        else return undefined
    }
    makeSubcommand() {
        this.isSubcommand = true
        return this
    }
}