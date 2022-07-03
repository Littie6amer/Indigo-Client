import { Client } from "../lib/Client"

export interface SlashCommandManagerOptions {
    client: Client
    folders?: string[]
}

export interface ClientEventManagerOptions {
    client: Client
    folders?: string[]
}