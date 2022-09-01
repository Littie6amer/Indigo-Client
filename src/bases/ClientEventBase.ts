import { Client } from "..";
import { ClientEventOptions } from "./Interfaces";

export class ClientEventBase {
    name: string;
    client: Client;
    constructor(client: Client, options: ClientEventOptions) {
        this.client = client
        this.name = options.name
    }
    execute(...data: any[]) {
        console.log(`[${this.name}] No execute function set!`)
    }
}