import * as DiscordJS from "discord.js";
import { ClientEventManager } from "..";
import { ClientOptions } from "./Interfaces";
import { Toolbox } from "../modules/Toolbox";
import { SlashCommandManager } from "../modules/SlashCommandManager";
export declare class Client extends DiscordJS.Client {
    rootPath: string;
    toolbox: Toolbox;
    eventManager: ClientEventManager;
    slashCommandManager: SlashCommandManager;
    constructor(options: ClientOptions);
}
