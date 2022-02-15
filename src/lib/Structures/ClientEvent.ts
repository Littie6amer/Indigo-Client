import { ClientEvents } from "discord.js";
import { BootClient } from "../index.js";

export default class ClientEvent {
    readonly type: "EVENT" = "EVENT";
    name: keyof ClientEvents;
    execute: Function;

    constructor (name: keyof ClientEvents, execute: (client: BootClient, paramA?: any, paramB?: any) => any) {
        this.name = name;
        this.execute = execute
    }
}