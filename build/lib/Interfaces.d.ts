import { BitFieldResolvable, GatewayIntentsString } from "discord.js";
import { ClientEventBase } from "..";
export interface ClientOptions {
    eventFolders?: string[];
    events?: ClientEventBase[];
    slashCommandFolders?: string[];
    defaultEvents?: boolean;
    intents: BitFieldResolvable<GatewayIntentsString, number>;
    mobileStatus?: boolean;
}
