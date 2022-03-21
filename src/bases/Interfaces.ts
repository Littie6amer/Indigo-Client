import { ClientEvents } from "discord.js";

export interface ClientEventOptions {
    name: keyof ClientEvents
}