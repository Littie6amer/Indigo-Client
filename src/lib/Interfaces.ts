import { BitFieldResolvable, ColorResolvable, GatewayIntentsString } from "discord.js";
import { ClientEventBase } from "..";

export interface ClientOptions {
    eventFolders?: string[]
    events?: ClientEventBase[]
    commandFolders?: string[]
    defaultEvents?: boolean
    intents: BitFieldResolvable<GatewayIntentsString, number>
    mobileStatus?: boolean
    embedColor?: ColorResolvable
}