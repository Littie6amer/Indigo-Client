import { BootClient } from "..";
import { ClientEventOptions } from "./Interfaces";
export declare class ClientEventBase {
    name: string;
    constructor(options: ClientEventOptions);
    execute(client: BootClient, ...data: any[]): void;
}
