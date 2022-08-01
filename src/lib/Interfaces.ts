import { BitFieldResolvable, ColorResolvable, GatewayIntentsString } from "discord.js";
import { ClientEventBase } from "..";
import { Client } from "./Client";

export interface ClientOptions {
    eventFolders?: string[]
    events?: ClientEventBase[]
    commandFolders?: string[]
    defaultEvents?: boolean
    intents: BitFieldResolvable<GatewayIntentsString, number>
    mobileStatus?: boolean
    embedColor?: ColorResolvable
}