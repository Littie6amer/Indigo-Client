import { BootClient, ClientEventBase } from ".."

export default class Event extends ClientEventBase {
    constructor () {
        super({ name: "ready" })
    }

    execute(client: BootClient, ...data: any[]) {
        console.log(`[${this.name}] Logged in as ${client.user?.tag}!`)
        console.log(`[${this.name}] Watching ${client.guilds.cache.size} servers!`)
    }
}