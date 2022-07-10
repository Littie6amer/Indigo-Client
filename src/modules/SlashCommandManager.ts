import { CommandInteraction, ApplicationCommandDataResolvable, CommandInteractionOption, CacheType } from "discord.js";
import { SlashCommandBase } from "../bases/SlashCommandBase";
import { Client } from "../lib/Client";
import { SlashCommandManagerOptions } from "./Interfaces";
import { FileUtilties } from "./FileUtilties";
import { Toolbox } from "./Toolbox";
const toolbox = new Toolbox()

export class SlashCommandManager extends FileUtilties {
    slashcommands: SlashCommandBase[]
    client: Client;
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

    async run(name: string, interaction: CommandInteraction) {
        let slashcommands: SlashCommandBase[] | undefined = this.slashcommands.filter(s => s.name == name)
        if (slashcommands.length) slashcommands.forEach(slashcommand => {
            slashcommand.run(getSubcommands(interaction.options.data[0]), this.client, interaction)
        });
        function getSubcommands (option: CommandInteractionOption<CacheType> | undefined): string[] {
            if (!option?.options) return []
            return [option.name, ...getSubcommands(option.options[0])]
        }
    }
    
    async _inDev_Deploy(name: string, guildId?: string) {
        const command = await this.client.application?.commands.cache.filter(c => !guildId || c.guildId == guildId).find(c => c.name == name)
        const slashcommand = this.slashcommands.find(s => s.name == name)
        if (!slashcommand) return
        if (command) this.client.application?.commands.edit(command, slashcommand.getData() as ApplicationCommandDataResolvable).catch()
        else this.client.application?.commands.create(slashcommand.getData() as ApplicationCommandDataResolvable, guildId).catch()
    }

    async _inDev_Delete(name: string, guildId?: string) {
        const command = await this.client.application?.commands.cache.filter(c => !guildId || c.guildId == guildId).find(c => c.name == name)
        const slashcommand = this.slashcommands.find(s => s.name == name)
        if (!slashcommand) return
        if (command) this.client.application?.commands.delete(command, guildId).catch()
    }
}