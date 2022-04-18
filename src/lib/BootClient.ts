import { Client } from "discord.js";
import path from "path";
import { ClientEventManager } from "..";
import { ClientOptions } from "./Interfaces";
import { Toolbox } from "./modules/Toolbox";
import { SlashCommandManager } from "./SlashCommandManager";


export class BootClient extends Client {
    rootPath: string = require?.main?.path || ""
    toolbox: Toolbox;
    eventManager: ClientEventManager;
    slashCommandManager: SlashCommandManager;
    constructor(options: ClientOptions) {
        super({ intents: options.intents, ws: { properties: { $browser: options.mobile ? "Discord iOS" : undefined } } });
        const eventFolders = options.eventFolders?.map(folder => this.rootPath+path.sep+folder)||[]
        if (options?.bootEvents !== false) eventFolders?.push(path.resolve(__dirname, "../boot-events"))
        this.eventManager = new ClientEventManager({ client: this, folders: eventFolders });
        this.toolbox = new Toolbox()
        const slashCommandFolders = options.slashCommandFolders?.map(folder => this.rootPath+path.sep+folder)||[]
        this.slashCommandManager = new SlashCommandManager({ client: this, folders: slashCommandFolders })
        if (options?.events) this.eventManager.registerEvents(options.events)
    }
}