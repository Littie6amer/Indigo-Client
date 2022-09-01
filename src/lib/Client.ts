import * as DiscordJS from "discord.js"
import path from "path";
import { ClientEventManager } from "..";
import { ClientOptions } from "./Interfaces";
import { Toolbox } from "../modules/Toolbox";
import { CommandManager } from "../modules/CommandManager";
import { ClientEventBase, SlashCommandBase } from "..";


export class Client extends DiscordJS.Client {
    rootPath: string = require?.main?.path || ""
    commandManager: CommandManager;
    commands: SlashCommandBase[];
    embedColor: DiscordJS.ColorResolvable;
    eventManager: ClientEventManager;
    events: ClientEventBase[];
    toolbox: Toolbox;
    constructor(options: ClientOptions) {
        super({ intents: options.intents, ws: { properties: { browser: options.mobileStatus ? "Discord iOS" : undefined } } });
        const eventFolders = options.eventFolders?.map(folder => this.rootPath + path.sep + folder) || []
        if (options?.defaultEvents !== false) eventFolders?.push(path.resolve(__dirname, "../default-events"))
        this.eventManager = new ClientEventManager({ client: this, folders: eventFolders, events: options.events });
        this.events = []
        const commandFolders = options.commandFolders?.map(folder => this.rootPath + path.sep + folder) || []
        this.commandManager = new CommandManager({ client: this, folders: commandFolders })
        this.commands = []
        this.embedColor = options.embedColor || "#4b0082"
        this.toolbox = new Toolbox({ client: this });
    }
}