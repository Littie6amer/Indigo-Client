import * as DiscordJS from "discord.js";
import { ClientEventManager } from "..";
import { ClientOptions } from "./Interfaces";
import { CommandManager } from "../modules/CommandManager";
import { ClientEventBase, SlashCommandBase } from "..";
export declare class Client extends DiscordJS.Client {
    rootPath: string;
    commandManager: CommandManager;
    commands: SlashCommandBase[];
    embedColor: DiscordJS.ColorResolvable;
    eventManager: ClientEventManager;
    events: ClientEventBase[];
    constructor(options: ClientOptions);
}
