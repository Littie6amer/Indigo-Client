import { Client } from "../lib/Client";
import { CommandContext } from "./CommandContext";
import { SlashCommandOptionChannelTypes, SlashCommandOptions, SlashCommandOptionTypes, Permissions, SlashCommandValueOption } from "./Interfaces";
export declare class SlashCommandBase {
    client: Client;
    name: string;
    isSubcommand: boolean;
    description: string;
    options: SlashCommandValueOption[];
    subcommands: SlashCommandBase[];
    required_permissions?: {
        guild?: Permissions;
        channel?: Permissions;
    };
    constructor(client: Client, options: SlashCommandOptions);
    run(optionNames: string[], ctx: CommandContext): Promise<void>;
    execute(ctx: CommandContext): any;
    getData(): object;
    getJSON(): object;
    getOptionJSON(option: SlashCommandValueOption): object;
    getOptionData(option: SlashCommandValueOption): object;
    getOptionTypeValue(type: SlashCommandOptionChannelTypes | SlashCommandOptionTypes): number;
    getType(): 1 | 2 | undefined;
    makeSubcommand(): this;
}
