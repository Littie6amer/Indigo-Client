import { BitFieldResolvable, GatewayIntentsString } from "discord.js";
import { ClientEventBase } from "..";
import { Client } from "./Client";

export interface ClientOptions {
    eventFolders?: string[]
    events?: ClientEventBase[]
    slashCommandFolders?: string[]
    defaultEvents?: boolean
    intents: BitFieldResolvable<GatewayIntentsString, number>,
    mobileStatus?: boolean
}