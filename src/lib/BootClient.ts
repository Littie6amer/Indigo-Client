import { Client } from "discord.js";
import { ClientEventManager } from "..";
import { ClientOptions } from "./Interfaces";


export class BootClient extends Client {
    eventManager: ClientEventManager;
    constructor(options?: ClientOptions) {
        super({ intents: ["GUILD_MESSAGES", "GUILDS"] });
        this.eventManager = new ClientEventManager({ client: this });
        if (options?.eventFolders) this.eventManager.loadFolders(options.eventFolders)
        if (options?.events) this.eventManager.registerEvents(options.events)
        if (options?.bootEvents !== false) this.eventManager.loadBootEvents()
    }
}