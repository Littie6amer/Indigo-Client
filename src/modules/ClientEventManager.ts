import { ClientEventBase } from "..";
import { Client } from "../lib/Client";
import { ClientEventManagerOptions } from "./Interfaces";
import { FileUtilties } from "./FileUtilties";

export class ClientEventManager extends FileUtilties {
    client: Client;
    constructor(options: ClientEventManagerOptions) {
        super()
        this.client = options.client
        const { events, folders } = options
        if (folders?.length) {
            console.log(`[EventManager] Searching folders: ${folders.join(", ")}`)
            this.registerDirectories(folders)
        }
        if (events?.length) {
            console.log(`[EventManager] Adding events: ${events.map(e => e.name).join()}`)
            this.registerEvents(events)
        }
    }

    async importFromFile(filePath: string) {
        const { default: raw } = await import(filePath).catch((err) => console.log(`[FileUtilties] Unable to import ${filePath}\n${err}`))
        const data: any = Object.getPrototypeOf(raw) ? new raw(this.client) : raw
        return data
    }

    async registerDirectories(folders: string[]) {
        for (let index = 0; index < folders.length; index++) {
            await this.registerDirectory(folders[index])
        }
    }

    async registerDirectory(directoryPath: string) {
        const events = (await this.importFromDirectory(directoryPath)).filter(event => event instanceof ClientEventBase)
        await this.registerEvents(events)
    }

    async registerEvents(events: ClientEventBase[]) {
        if (!events.length) return;
        console.log(`[EventManager] Now listening for: ${events.map(event => event.name).join(", ")}`)
        for (let event in events) {
            if (!this.client.events.find(e => e.name == events[event].name)) await this.client.on(events[event].name, (...data: any[]) => this.runEvent(events[event].name, ...data))
            this.client.events.push(events[event])
        }
    }

    async registerEvent(event: ClientEventBase) {
        console.log(`[EventManager] Now listening for: ${event.name}`)
        if (!this.client.events.find(e => e.name == event.name)) await this.client.on(event.name, (...data: any[]) => this.runEvent(event.name, ...data))
        this.client.events.push(event)
    }

    async runEvent(name: string, ...data: any[]) {
        let events: ClientEventBase[] | undefined = this.client.events.filter(e => e.name == name)
        if (events.length) events.forEach(event => {
            event.execute(...data)
        });
    }
}