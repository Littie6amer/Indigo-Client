import { Interaction } from "discord.js";
import { ClientEventBase } from "../bases/ClientEventBase";
import { BootClient } from "../lib/BootClient";
export default class Event extends ClientEventBase {
    constructor();
    execute(client: BootClient, interaction: Interaction): void;
}
