import * as DiscordJS from "discord.js";
import { ClientEventManager } from "..";
import { ClientOptions } from "./Interfaces";
import { Toolbox } from "../modules/Toolbox";
import { SlashCommandManager } from "../modules/SlashCommandManager";
export declare class Client extends DiscordJS.Client {
    rootPath: string;
    toolbox: Toolbox;
    events: ClientEventManager;
    commands: SlashCommandManager;
    constructor(options: ClientOptions);
}
