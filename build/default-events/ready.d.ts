import { Client, ClientEventBase } from "..";
export default class Event extends ClientEventBase {
    constructor();
    execute(client: Client): void;
}
