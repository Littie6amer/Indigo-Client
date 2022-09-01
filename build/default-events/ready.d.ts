import { Client, ClientEventBase } from "..";
export default class Event extends ClientEventBase {
    constructor(client: Client);
    execute(): void;
}
