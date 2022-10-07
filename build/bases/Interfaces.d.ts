import { ClientEvents, PermissionFlags } from "discord.js";
import { SlashCommandBase } from "./SlashCommandBase";
export interface ClientEventOptions {
    name: keyof ClientEvents;
}
export declare type GuildPermissionFlag = "a" | "b";
export interface Permissions {
    author?: (keyof PermissionFlags)[];
    bot?: (keyof PermissionFlags)[];
}
export interface SlashCommandOptions {
    name: string;
    description: string;
    subcommands?: SlashCommandBase[];
    options?: SlashCommandValueOption[];
    required_channel_permissions?: Permissions;
    required_guild_permissions?: Permissions;
}
export interface SlashCommandValueOption {
    name: string;
    type: SlashCommandOptionTypes;
    description: string;
    required?: boolean;
    autocomplete?: boolean;
    choices?: SlashCommandValueOptionChoice[];
    channel_types?: SlashCommandOptionChannelTypes[];
    required_channel_permissions?: Permissions;
    min_value?: number;
    max_value?: number;
}
export interface SlashCommandValueOptionChoice {
    name: string;
    value: string | number;
    type: SlashCommandOptionTypes;
    focused?: boolean;
}
export declare type SlashCommandOptionTypes = "STRING" | "INTEGER" | "BOOLEAN" | "USER" | "ROLE" | "CHANNEL" | "MENTIONABLE" | "NUMBER" | "ATTACHMENT";
export declare type SlashCommandOptionChannelTypes = "GUILD_TEXT" | "DM" | "GUILD_VOICE" | "GROUP_DM" | "GUILD_CATEGORY" | "GUILD_NEWS" | "GUILD_NEWS_THREAD" | "GUILD_PUBLIC_THREAD" | "GUILD_PRIVATE_THREAD" | "GUILD_STAGE_VOICE" | "GUILD_DIRECTORY";
