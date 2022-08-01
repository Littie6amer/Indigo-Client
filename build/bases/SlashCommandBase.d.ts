import { CommandInteraction } from "discord.js";
import { Client } from "../lib/Client";
import { SlashCommandOptionChannelTypes, SlashCommandOptions, SlashCommandOptionTypes, SlashCommandValueOption } from "./Interfaces";
import { Toolbox } from "../modules/Toolbox";
export declare class SlashCommandBase extends Toolbox {
    client: Client;
    name: string;
    isSubcommand: boolean;
    description: string;
    options: SlashCommandValueOption[];
    subcommands: SlashCommandBase[];
    constructor(client: Client, options: SlashCommandOptions);
    run(optionNames: string[], interaction: CommandInteraction): void;
    execute(interaction: CommandInteraction): any;
    getData(): object;
    getJSON(): object;
    getOptionJSON(option: SlashCommandValueOption): object;
    getOptionData(option: SlashCommandValueOption): object;
    getOptionTypeValue(type: SlashCommandOptionChannelTypes | SlashCommandOptionTypes): number;
    getType(): 1 | 2 | undefined;
    makeSubcommand(): this;
}
