import { Client } from "discord.js";
import { ClientEventManager } from "..";
import { ClientOptions } from "./Interfaces";
import { Toolbox } from "./modules/Toolbox";
import { SlashCommandManager } from "./SlashCommandManager";
export declare class BootClient extends Client {
    rootPath: string;
    toolbox: Toolbox;
    eventManager: ClientEventManager;
    slashCommandManager: SlashCommandManager;
    constructor(options: ClientOptions);
}
