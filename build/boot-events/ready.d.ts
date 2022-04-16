import { BootClient, ClientEventBase } from "..";
export default class Event extends ClientEventBase {
    constructor();
    execute(client: BootClient, ...data: any[]): void;
}
