import { CommandInteraction, GuildMember, PermissionFlags, PermissionsBitField } from "discord.js"
import { Client } from "../lib/Client"
import { SlashCommandOptionChannelTypes, SlashCommandOptions, SlashCommandOptionTypes, SlashCommandValueOption } from "./Interfaces";

export class SlashCommandBase {
    client: Client;
    name: string;
    isSubcommand: boolean;
    description: string;
    options: SlashCommandValueOption[];
    subcommands: SlashCommandBase[];
    constructor(client: Client, options: SlashCommandOptions) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options ?? []
        this.subcommands = options.subcommands?.map(subcommand => subcommand.makeSubcommand()) ?? []
        this.isSubcommand = false
    }
    run(optionNames: string[], interaction: CommandInteraction) {
        const subcommand = optionNames.length ? this.subcommands.find(subcommand => subcommand.name == optionNames[0]) : null
        optionNames.shift()
        if (!subcommand) {
            //     const userPerms = (interaction.member as GuildMember)?.permissionsIn(interaction.channel?.id || "") as Readonly<PermissionsBitField>
            //     const botPerms = (interaction.guild?.members.cache.get(this.client.user?.id || "") as GuildMember)?.permissionsIn(interaction.channel?.id || "") as Readonly<PermissionsBitField>
            //     if (this.user_permissions && !userPerms.has(this.user_permissions)) return interaction.reply({
            //         embeds: [this.client.toolbox.missingPermissionsEmbed(interaction.user, this.user_permissions)]
            //     })
            //     if (this.bot_permissions && !botPerms.has(this.bot_permissions)) return interaction.reply({
            //         // @ts-ignore
            //         embeds: [this.client.toolbox.missingPermissionsEmbed(this.client.user, this.bot_permissions)]
            //     })
            //     this.execute(interaction)
        } else subcommand.run(optionNames, interaction)
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