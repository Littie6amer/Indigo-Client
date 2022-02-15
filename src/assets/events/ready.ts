import { BootClient, ClientEvent } from "../../lib/index.js";

const event = new ClientEvent("ready", (client: BootClient) => {
    console.log(`[${event.name}]: Logged in as ${client.user?.tag}`)
    console.log(`[${event.name}]: ${client.guilds.cache.size} Guild(s)`)
})

export default event
