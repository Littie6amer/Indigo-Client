import { ClientEventBase } from "..";
import { Client } from "../lib/Client";
import { ClientEventManagerOptions } from "./Interfaces";
import { FileUtilties } from "./FileUtilties";
export declare class ClientEventManager extends FileUtilties {
    client: Client;
    constructor(options: ClientEventManagerOptions);
    importFromFile(filePath: string): Promise<any>;
    registerDirectories(folders: string[]): Promise<void>;
    registerDirectory(directoryPath: string): Promise<void>;
    registerEvents(events: ClientEventBase[]): Promise<void>;
    registerEvent(event: ClientEventBase): Promise<void>;
    runEvent(name: string, ...data: any[]): Promise<void>;
}
