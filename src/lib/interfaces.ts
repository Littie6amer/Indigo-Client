import { ClientEventBase } from "..";
import { BootClient } from "./BootClient";

export interface ClientOptions {
    eventFolders?: string[]
    events?: ClientEventBase[]
    bootEvents?: boolean
}

export interface ClientEventManagerOptions {
    client: BootClient
}