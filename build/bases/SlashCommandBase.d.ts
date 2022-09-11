import { CommandInteraction } from "discord.js";
import { Client } from "../lib/Client";
import { SlashCommandOptionChannelTypes, SlashCommandOptions, SlashCommandOptionTypes, SlashCommandPermissions, SlashCommandValueOption } from "./Interfaces";
export declare class SlashCommandBase {
    client: Client;
    name: string;
    isSubcommand: boolean;
    description: string;
    options: SlashCommandValueOption[];
    subcommands: SlashCommandBase[];
    required_permissions?: SlashCommandPermissions;
    constructor(client: Client, options: SlashCommandOptions);
    run(optionNames: string[], interaction: CommandInteraction): Promise<void>;
    permissionCheck(interaction: CommandInteraction): Promise<{
        passed: true | false;
    }>;
    prechecks(interaction: CommandInteraction): {
        passed: true | false;
    };
    execute(interaction: CommandInteraction): any;
    getData(): object;
    getJSON(): object;
    getOptionJSON(option: SlashCommandValueOption): object;
    getOptionData(option: SlashCommandValueOption): object;
    getOptionTypeValue(type: SlashCommandOptionChannelTypes | SlashCommandOptionTypes): number;
    getType(): 1 | 2 | undefined;
    makeSubcommand(): this;
}
