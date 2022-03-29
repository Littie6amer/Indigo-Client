import { BitFieldResolvable, IntentsString } from "discord.js";
import { ClientEventBase } from "..";
import { BootClient } from "./BootClient";

export interface ClientOptions {
    eventFolders?: string[]
    events?: ClientEventBase[]
    bootEvents?: boolean
    intents: BitFieldResolvable<IntentsString, number>
}

export interface ClientEventManagerOptions {
    client: BootClient
}
