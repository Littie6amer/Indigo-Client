import { CommandInteraction } from "discord.js";
import { SlashCommandBase } from "../bases/SlashCommandBase";
import { Client } from "../lib/Client";
import { SlashCommandManagerOptions } from "./Interfaces";
import { FileUtilties } from "./FileUtilties";
export declare class CommandManager extends FileUtilties {
    client: Client;
    constructor(options: SlashCommandManagerOptions);
    importFromFile(filePath: string): Promise<any>;
    registerDirectories(folders: string[]): Promise<void>;
    registerDirectory(directoryPath: string): Promise<void>;
    registerSlashCommands(slashcommands: SlashCommandBase[]): Promise<void>;
    registerSlashCommand(slashcommand: SlashCommandBase): Promise<void>;
    run(name: string, interaction: CommandInteraction): Promise<void>;
    _inDev_Deploy(name: string, guildId?: string): Promise<void>;
    _inDev_Delete(name: string, guildId?: string): Promise<void>;
}
