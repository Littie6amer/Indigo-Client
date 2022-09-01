import { Client, ClientEventBase } from ".."

export default class Event extends ClientEventBase {
    constructor (client: Client) {
        super(client, { name: "ready" })
    }

    execute() {
        console.log(`[${this.name}] Logged in as ${this.client.user?.tag}!`)
        console.log(`[${this.name}] Watching ${this.client.guilds.cache.size} servers!`)
    }
}