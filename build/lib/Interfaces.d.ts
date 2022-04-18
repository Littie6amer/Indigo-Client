import { BitFieldResolvable, IntentsString } from "discord.js";
import { ClientEventBase } from "..";
import { BootClient } from "./BootClient";
export interface ClientOptions {
    eventFolders?: string[];
    events?: ClientEventBase[];
    slashCommandFolders?: string[];
    bootEvents?: boolean;
    intents: BitFieldResolvable<IntentsString, number>;
    mobile?: boolean;
}
export interface ClientEventManagerOptions {
    client: BootClient;
    folders?: string[];
}
export interface SlashCommandManagerOptions {
    client: BootClient;
    folders?: string[];
}
export interface SubCommandManagerOptions {
    folders?: string[];
}
