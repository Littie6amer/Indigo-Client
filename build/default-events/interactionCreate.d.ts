import { Interaction } from "discord.js";
import { ClientEventBase } from "../bases/ClientEventBase";
import { Client } from "../lib/Client";
export default class Event extends ClientEventBase {
    constructor();
    execute(client: Client, interaction: Interaction): void;
}
