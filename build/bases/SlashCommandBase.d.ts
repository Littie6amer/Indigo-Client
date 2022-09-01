import { CommandInteraction, PermissionFlags } from "discord.js";
import { Client } from "../lib/Client";
import { SlashCommandOptionChannelTypes, SlashCommandOptions, SlashCommandOptionTypes, SlashCommandValueOption } from "./Interfaces";
export declare class SlashCommandBase {
    client: Client;
    name: string;
    isSubcommand: boolean;
    description: string;
    options: SlashCommandValueOption[];
    subcommands: SlashCommandBase[];
    user_permissions: (keyof PermissionFlags)[];
    bot_permissions: (keyof PermissionFlags)[];
    constructor(client: Client, options: SlashCommandOptions);
    run(optionNames: string[], interaction: CommandInteraction): Promise<import("discord.js").InteractionResponse<boolean>> | undefined;
    execute(interaction: CommandInteraction): any;
    getData(): object;
    getJSON(): object;
    getOptionJSON(option: SlashCommandValueOption): object;
    getOptionData(option: SlashCommandValueOption): object;
    getOptionTypeValue(type: SlashCommandOptionChannelTypes | SlashCommandOptionTypes): number;
    getType(): 1 | 2 | undefined;
    makeSubcommand(): this;
}
