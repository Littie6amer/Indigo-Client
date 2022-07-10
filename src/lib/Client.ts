import * as DiscordJS from "discord.js"
import path from "path";
import { ClientEventManager } from "..";
import { ClientOptions } from "./Interfaces";
import { Toolbox } from "../modules/Toolbox";
import { SlashCommandManager } from "../modules/SlashCommandManager";


export class Client extends DiscordJS.Client {
    rootPath: string = require?.main?.path || ""
    toolbox: Toolbox;
    eventManager: ClientEventManager;
    slashCommandManager: SlashCommandManager;
    constructor(options: ClientOptions) {
        super({ intents: options.intents, ws: { properties: { browser: options.mobileStatus ? "Discord iOS" : undefined } } });
        const eventFolders = options.eventFolders?.map(folder => this.rootPath + path.sep + folder) || []
        if (options?.defaultEvents !== false) eventFolders?.push(path.resolve(__dirname, "../default-events"))
        this.eventManager = new ClientEventManager({ client: this, folders: eventFolders });
        this.toolbox = new Toolbox()
        const commandFolders = options.commandFolders?.map(folder => this.rootPath + path.sep + folder) || []
        this.slashCommandManager = new SlashCommandManager({ client: this, folders: commandFolders })
        if (options?.events) this.eventManager.registerEvents(options.events)
    }
}