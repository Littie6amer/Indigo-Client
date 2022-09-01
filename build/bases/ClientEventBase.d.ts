import { Client } from "..";
import { ClientEventOptions } from "./Interfaces";
export declare class ClientEventBase {
    name: string;
    client: Client;
    constructor(client: Client, options: ClientEventOptions);
    execute(...data: any[]): void;
}
