import { Client } from "..";
import { ClientEventOptions } from "./Interfaces";
export declare class ClientEventBase {
    name: string;
    constructor(options: ClientEventOptions);
    execute(client: Client, ...data: any[]): void;
}
