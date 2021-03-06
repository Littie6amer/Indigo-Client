import { ClientEventBase } from "..";
import { IndigoClient } from "./Client";
import { ClientEventManagerOptions } from "./Interfaces";
import { FileUtilties } from "./modules/FileUtilties";
export declare class ClientEventManager extends FileUtilties {
    events: ClientEventBase[];
    client: IndigoClient;
    constructor(options: ClientEventManagerOptions);
    registerDirectories(folders: string[]): Promise<void>;
    registerDirectory(directoryPath: string): Promise<void>;
    registerEvents(events: ClientEventBase[]): Promise<void>;
    registerEvent(event: ClientEventBase): Promise<void>;
    runEvent(name: string, ...data: any[]): Promise<void>;
}
