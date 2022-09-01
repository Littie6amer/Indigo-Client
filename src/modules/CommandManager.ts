import { CommandInteraction, ApplicationCommandDataResolvable, CommandInteractionOption, CacheType, PermissionsBitField } from "discord.js";
import { SlashCommandBase } from "../bases/SlashCommandBase";
import { Client } from "../lib/Client";
import { SlashCommandManagerOptions } from "./Interfaces";
import { FileUtilties } from "./FileUtilties";
import { Toolbox } from "./Toolbox";

export class CommandManager extends FileUtilties {
    client: Client;
    constructor(options: SlashCommandManagerOptions) {
        super()
        this.client = options.client
        const folders = options.folders
        if (folders?.length) {
            console.log(`[SlashCommandManager] Searching folders: ${folders.join(", ")}`)
            this.registerDirectories(folders)
        }
    }

    async importFromFile(filePath: string) {
        const fileData = await import(filePath).catch((err) => console.log(`[FileUtilties] Unable to import ${filePath}\n${err}`))
        let slashCommand = null
        if (fileData && fileData.Command && fileData.Command?.prototype instanceof SlashCommandBase) slashCommand = new fileData.Command(this.client)
        return slashCommand
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
            this.client.commands.push(slashcommands[slashcommand])
        }
    }

    async registerSlashCommand(slashcommand: SlashCommandBase) {
        this.client.commands.push(slashcommand)
    }

    async run(name: string, interaction: CommandInteraction) {
        const slashcommands: SlashCommandBase[] | undefined = this.client.commands.filter(s => s.name == name)
        if (slashcommands.length) slashcommands.forEach(slashcommand => {
            const subcommands = getSubcommands(interaction.options.data[0]);            
            slashcommand.run(subcommands, interaction)
        });
        function getSubcommands (option: CommandInteractionOption<CacheType> | undefined): string[] {
            if (!option?.options) return []
            return [option.name, ...getSubcommands(option.options[0])]
        }
    }

    async _inDev_Deploy(name: string, guildId?: string) {
        const command = await this.client.application?.commands.cache.filter(c => !guildId || c.guildId == guildId).find(c => c.name == name)
        const slashcommand = this.client.commands.find(s => s.name == name)
        if (!slashcommand) return
        if (command) this.client.application?.commands.edit(command, slashcommand.getData() as ApplicationCommandDataResolvable).catch(console.log)
        else this.client.application?.commands.create(slashcommand.getData() as ApplicationCommandDataResolvable, guildId).catch(console.log)
    }

    async _inDev_Delete(name: string, guildId?: string) {
        const command = (await this.client.application?.commands.fetch())?.filter(c => !guildId || c.guildId == guildId).find(c => c.name == name)
        const slashcommand = this.client.commands.find(s => s.name == name)
        if (!slashcommand) return
        if (command) this.client.application?.commands.delete(command, guildId).catch(console.log)
    }
}

// export class SlashCommandManager {
//     slashcommands: SlashCommandBase[]
//     client: Client;
//     constructor(options: SlashCommandManagerOptions) {
//         this.client = options.client
//         this.client.commands = []
//         const folders = options.folders
//         if (folders?.length) {
//             console.log(`[SlashCommandManager] Searching folders: ${folders.join(", ")}`)
//             // this.registerDirectories(folders)
//         }
//     }


//     async _inDev_Deploy(name: string, guildId?: string) {
//         const command = await this.client.application?.commands.cache.filter(c => !guildId || c.guildId == guildId).find(c => c.name == name)
//         const slashcommand = this.client.commands.find(s => s.name == name)
//         if (!slashcommand) return
//         if (command) this.client.application?.commands.edit(command, slashcommand.getData() as ApplicationCommandDataResolvable).catch()
//         else this.client.application?.commands.create(slashcommand.getData() as ApplicationCommandDataResolvable, guildId).catch()
//     }
// }