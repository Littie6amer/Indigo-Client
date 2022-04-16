import { CommandInteraction } from "discord.js";
import { SlashCommandBase } from "../bases/SlashCommandBase";
import { BootClient } from "./BootClient";
import { SlashCommandManagerOptions } from "./Interfaces";
import { FileUtilties } from "./modules/FileUtilties";
export declare class SlashCommandManager extends FileUtilties {
    slashcommands: SlashCommandBase[];
    client: BootClient;
    constructor(options: SlashCommandManagerOptions);
    registerDirectories(folders: string[]): Promise<void>;
    registerDirectory(directoryPath: string): Promise<void>;
    registerSlashCommands(slashcommands: SlashCommandBase[]): Promise<void>;
    registerSlashCommand(slashcommand: SlashCommandBase): Promise<void>;
    runSlashCommand(name: string, interaction: CommandInteraction): Promise<void>;
    _inDev_Deploy(name: string, guildId?: string): Promise<void>;
    _inDev_Delete(name: string, guildId?: string): Promise<void>;
}
