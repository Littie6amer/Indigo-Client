import { CommandInteraction } from "discord.js";
import { Client } from "../lib/Client";
import { SlashCommandOptionChannelTypes, SlashCommandOptions, SlashCommandOptionTypes, SlashCommandValueOption } from "./Interfaces";
export declare class SlashCommandBase {
    name: string;
    isSubcommand: boolean;
    description: string;
    options: SlashCommandValueOption[];
    subcommands: SlashCommandBase[];
    constructor(options: SlashCommandOptions);
    run(optionNames: string[], client: Client, interaction: CommandInteraction): void;
    execute(client: Client, interaction: CommandInteraction): any;
    getData(): object;
    getJSON(): object;
    getOptionJSON(option: SlashCommandValueOption): object;
    getOptionData(option: SlashCommandValueOption): object;
    getOptionTypeValue(type: SlashCommandOptionChannelTypes | SlashCommandOptionTypes): number;
    getType(): 1 | 2 | undefined;
    makeSubcommand(): this;
}
