import { CommandInteraction } from "discord.js";
import { BootClient } from "../lib/BootClient";
import { SlashCommandOptionChannelTypes, SlashCommandOptions, SlashCommandOptionTypes, SlashCommandValueOption } from "./Interfaces";
export declare class SlashCommandBase {
    name: string;
    isSubcommand: boolean;
    description: string;
    options: SlashCommandValueOption[];
    subcommands: SlashCommandBase[];
    constructor(options: SlashCommandOptions);
    run(optionNames: string[], client: BootClient, interaction: CommandInteraction): void;
    execute(client: BootClient, interaction: CommandInteraction): void;
    getData(): object;
    getJSON(): object;
    getOptionJSON(option: SlashCommandValueOption): object;
    getOptionData(option: SlashCommandValueOption): object;
    getOptionTypeValue(type: SlashCommandOptionChannelTypes | SlashCommandOptionTypes): number;
    getType(): 1 | 2 | undefined;
    makeSubcommand(): this;
}
