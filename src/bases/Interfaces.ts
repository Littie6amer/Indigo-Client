import { ClientEvents, CommandInteraction } from "discord.js";
import { BootClient } from "../lib/BootClient";
import { SlashCommandBase } from "./SlashCommandBase";

export interface ClientEventOptions {
    name: keyof ClientEvents
}

export interface SlashCommandOptions {
    name: string;
    description: string;
    subcommands?: SlashCommandBase[]
    options?: SlashCommandValueOption[]
}

export interface SlashCommandValueOption {
    name: string;
    type: SlashCommandOptionTypes
    description: string;
    required?: boolean;
    autocomplete?: boolean;
    choices?: SlashCommandValueOptionChoice[];
    channel_types?: SlashCommandOptionChannelTypes[];
    min_value?: number
    max_value?: number
}

export interface SlashCommandValueOptionChoice {
    name: string;
    value: string | number;
    type: SlashCommandOptionTypes
    focused?: boolean
}

export type SlashCommandOptionTypes = "STRING" | "INTEGER" | "BOOLEAN" | "USER" | "ROLE" | "CHANNEL" | "MENTIONABLE" | "NUMBER" | "ATTACHMENT"
export type SlashCommandOptionChannelTypes = "GUILD_TEXT" | "DM" | "GUILD_VOICE" | "GROUP_DM" | "GUILD_CATEGORY" | "GUILD_NEWS" | "GUILD_NEWS_THREAD" | "GUILD_PUBLIC_THREAD" | "GUILD_PRIVATE_THREAD" | "GUILD_STAGE_VOICE" | "GUILD_DIRECTORY"