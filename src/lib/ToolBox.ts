import { ClientEvent, SlashCommand, slashCommandData } from "./index.js";
import fs from "fs"; import pathUtil from "path";
// const { Routes } = require('discord-api-types/v9');
// const { REST } = require('@discordjs/rest')
import fetch from 'node-fetch';
import { ClientEvents } from "discord.js";

export default class ToolBox {
    assets: (SlashCommand | ClientEvent)[];

    constructor() {
        this.assets = []
    }

    async loadAssetFolders(folders: string[]) {
        for (let i = 0; i < folders.length; i++) {
            let assetCount = this.assets.length
            await this.loadAssetFolder(folders[i])
        }
    }

    async loadAssetFolder(folder: string) {
        let folderPath = pathUtil.resolve(process.cwd(), "build", folder)
        let contents = fs.readdirSync(folderPath)

        for (let i = 0; i < contents.length; i++) {
            let currentFolderPath = folderPath + `\\${contents[i]}`
            if (!contents[i].includes('.')) (await this.loadAssetFolder(currentFolderPath))
            else if (contents[i].endsWith('.js')) {
                let fileData: (SlashCommand | ClientEvent) | (SlashCommand | ClientEvent)[] = (await import("../" + folderPath.split(pathUtil.sep).slice(folderPath.split(pathUtil.sep).findIndex(dir => dir == "build") + 1).join("/") + `/${contents[i]}`)).default

                if (!fileData) return;
                if (fileData instanceof Array) this.assets.push(...fileData)
                else this.assets.push(fileData)
            }
        }
    }

    findAsset(type: "SLASH_COMMAND" | "EVENT", name: string) {
        return this.assets.find(a => a.name == name && a.type == type)
    }

    getAllAssets(type: "SLASH_COMMAND" | "EVENT") {
        return this.assets.filter(a => a.type == type)
    }

    getClientIdFromToken(token: string) {
        return Buffer.from(token, "base64").toString("ascii").toString().split("_")[0].slice(0, 18)
    }

    async deploySlashCommands(BOT_TOKEN: string, GUILD_ID?: string) {
        const CLIENT_ID: string = this.getClientIdFromToken(BOT_TOKEN)
        const url = `https://discord.com/api/v9/applications/${CLIENT_ID}${GUILD_ID ? `/guilds/${GUILD_ID}` : ""}/commands`
        this.getAllAssets("SLASH_COMMAND").forEach(a => {
            if (a instanceof SlashCommand) {
                fetch(url, {
                    method: "post",
                    headers: {
                        "Authorization": "Bot " + BOT_TOKEN,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(a.getData())
                }).then(async res => {
                    console.log(`/${a.name}: [${res.status}] ${res.statusText}`)
                })
            }
        })
    }
}
