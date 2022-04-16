import { ClientEventBase } from "..";
import { BootClient } from "./BootClient";
import { ClientEventManagerOptions } from "./Interfaces";
import { FileUtilties } from "./modules/FileUtilties";
export declare class ClientEventManager extends FileUtilties {
    events: ClientEventBase[];
    client: BootClient;
    constructor(options: ClientEventManagerOptions);
    registerDirectories(folders: string[]): Promise<void>;
    registerDirectory(directoryPath: string): Promise<void>;
    registerEvents(events: ClientEventBase[]): Promise<void>;
    registerEvent(event: ClientEventBase): Promise<void>;
    runEvent(name: string, ...data: any[]): Promise<void>;
}
