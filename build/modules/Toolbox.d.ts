import { EmbedBuilder, PermissionFlags, User } from "discord.js";
import { Client } from "../lib/Client";
export declare class Toolbox {
    client: Client;
    constructor(options: {
        client: Client;
    });
    simpleEmbed(text: string): EmbedBuilder;
    missingPermissionsEmbed(target: User, permissions: (keyof PermissionFlags)[]): EmbedBuilder;
}
