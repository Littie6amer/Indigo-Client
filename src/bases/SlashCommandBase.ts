import { CommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { BootClient } from "../lib/BootClient"
import { SlashCommandOptionChannelTypes, SlashCommandOptions, SlashCommandOptionTypes, SlashCommandValueOption } from "./Interfaces";

export class SlashCommandBase {
    name: string;
    isSubcommand: boolean;
    description: string;
    options: SlashCommandValueOption[];
    subcommands: SlashCommandBase[];
    constructor(options: SlashCommandOptions) {
        this.name = options.name
        this.description = options.description
        this.options = options.options ?? []
        this.subcommands = options.subcommands?.map(subcommand => subcommand.makeSubcommand()) ?? []
        this.isSubcommand = false
    }
    run(optionNames: string[], client: BootClient, interaction: CommandInteraction) {
        const subcommand = optionNames[0] ? this.subcommands.find(subcommand => subcommand.name == optionNames[0]) : null
        optionNames.shift()
        if (!subcommand) this.execute(client, interaction)
        else subcommand.run(optionNames, client, interaction)
    }
    execute(client: BootClient, interaction: CommandInteraction) {
        interaction.reply("This command is missing any code to run!")
    }
    getData(): object {
        const { name, description, options, subcommands, isSubcommand } = this
        const json: any = {
            name, description,
            options: [...options.map(option => this.getOptionData(option)), ...subcommands.map(subcommand => subcommand.getData())]
        }
        if (this.getType()) json.type = this.getType()
        return json as object
    }
    getJSON(): object {
        const { name, description, options, subcommands, isSubcommand } = this
        const json: any = {
            name, description,
            options: [...options.map(option => this.getOptionJSON(option)), ...subcommands.map(subcommand => subcommand.getJSON())]
        }
        if (this.getType()) json.type = this.getType()
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
        const json: any = { name, description, type, }
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