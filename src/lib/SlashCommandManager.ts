import { CommandInteraction, Interaction } from "discord.js";
import path from "path";
import { SlashCommandBase } from "../bases/SlashCommandBase";
import { BootClient } from "./BootClient";
import { SlashCommandManagerOptions } from "./Interfaces";
import { FileUtilties } from "./modules/FileUtilties";
import { Toolbox } from "./modules/Toolbox";
const toolbox = new Toolbox()

export class SlashCommandManager extends FileUtilties {
    slashcommands: SlashCommandBase[]
    client: BootClient;
    constructor(options: SlashCommandManagerOptions) {
        super()
        this.client = options.client
        this.slashcommands = []
        const folders = options.folders
        if (folders?.length) {
            console.log(`[SlashCommandManager] Searching folders: ${folders.join(", ")}`)
            this.registerDirectories(folders)
        }
    }

    async registerDirectories(folders: string[]) {
        for (let index = 0; index < folders.length; index++) {
            await this.registerDirectory(folders[index])
        }
    }

    async registerDirectory(directoryPath: string) {
        const slashcommands = (await this.importFromDirectory(directoryPath)).filter(slashcommand => slashcommand instanceof SlashCommandBase)
        await this.registerSlashCommands(slashcommands)
    }

    async registerSlashCommands(slashcommands: SlashCommandBase[]) {
        if (!slashcommands.length) return;
        for (let slashcommand in slashcommands) {
            this.slashcommands.push(slashcommands[slashcommand])
        }
    }

    async registerSlashCommand(slashcommand: SlashCommandBase) {
        this.slashcommands.push(slashcommand)
    }

    async runSlashCommand(name: string, interaction: CommandInteraction) {
        let slashcommands: SlashCommandBase[] | undefined = this.slashcommands.filter(s => s.name == name)
        if (slashcommands.length) slashcommands.forEach(slashcommand => {
            slashcommand.run(interaction.options.data.map(option => option.name), this.client, interaction)
        });
    }

    async _inDev_Deploy(name: string, guildId?: string) {
        const url = `https://discord.com/api/v9/applications/${this.client.user?.id}/`+guildId?`guilds/${guildId}/`:``+`commands`
        const slashcommand = this.slashcommands.find(s => s.name == name)
        if (slashcommand) fetch(url, {
            method: "post",
            headers: {
                "Authorization": "Bot "+this.client.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(slashcommand.getJSON())
        }).then(async res => {
            console.log(`/${slashcommand.name}: [${res.status}] ${res.statusText}`)
        })
    }
}