import { ClientEventBase } from "..";
import path from "path"
import fs from "fs"
import { BootClient } from "./BootClient";
import { ClientEventManagerOptions } from "./Interfaces";

export class ClientEventManager {
    events: ClientEventBase[];
    client: BootClient;
    constructor(options: ClientEventManagerOptions) {
        this.events = []
        this.client = options.client
    }

    async loadFolders(folders: string[]) {
        console.log(`[EventManager] Searching folders: ${folders.join(", ")}`)
        for (let index = 0; index < folders.length; index++) {
            await this.loadFolder(folders[index])
        }
    }

    async loadFolder(folder: string) {
        let files = await fs.readdirSync(require?.main?.path + path.sep + folder)
        let folders = files.filter(name => !name.includes("."))
        files = files.filter(name => name.endsWith(".js"))
        let events: ClientEventBase[] = [];
        for (let file in files) {
            let event = await this.getFileEvent(require?.main?.path + path.sep + folder + path.sep + files[file])
            if (event) events.push(event)
        }
        await this.registerEvents(events)
        for (let folder in folders) {
            await this.loadFolder(folder + path.sep + folders[folder])
        }
    }

    async loadFile(file: string) {
        let { default: data } = await import(require?.main?.path + path.sep + file)
        let event: ClientEventBase = new data()
        if (data.getSuperclass()) await this.registerEvent(event)
    }

    async getFileEvent(filePath: string) {
        let { default: data } = await import(filePath)
        let event: ClientEventBase = new data()
        if (event) return event
        else return null
    }

    async registerEvents(events: ClientEventBase[]) {
        if (!events.length) return;
        console.log(`[EventManager] Now listening for: ${events.map(event => event.name).join(", ")}`)
        for (let event in events) {
            if (!this.events.find(e => e.name == events[event].name)) await this.client.on(events[event].name, (...data: any[]) => this.runEvent(events[event].name, ...data))
            this.events.push(events[event])
        }
    }

    async registerEvent(event: ClientEventBase) {
        console.log(`[EventManager] Now listening for: ${event.name}`)
        if (!this.events.find(e => e.name == event.name)) await this.client.on(event.name, (...data: any[]) => this.runEvent(event.name, ...data))
        this.events.push(event)
    }

    async runEvent(name: string, ...data: any[]) {
        let events: ClientEventBase[] | undefined = this.events.filter(e => e.name == name)
        if (events.length) events.forEach(event => {
            event.execute(this.client, ...data)
        });
    }

    async loadBootEvents() {
        let files = await fs.readdirSync(`${path.resolve(__dirname, "../boot-events")}`)
        files = files.filter(name => name.endsWith(".js"))
        let events: ClientEventBase[] = [];
        for (let file in files) {
            let event = await this.getFileEvent(path.resolve(__dirname, "../boot-events") + path.sep + files[file])
            if (event) events.push(event)
        }
        await this.registerEvents(events)
    }
}