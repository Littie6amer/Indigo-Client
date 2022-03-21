import { BootClient } from "..";
import { ClientEventOptions } from "./Interfaces";

export class ClientEventBase {
    name: string;
    constructor(options: ClientEventOptions) {
        this.name = options.name
    }
    execute(client: BootClient, ...data: any[]) {
		console.log(`[${this.name}] No execute function set!`)
	}
}