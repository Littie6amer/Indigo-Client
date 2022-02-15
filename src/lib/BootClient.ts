import { CommandInteraction, Client, BitFieldResolvable, IntentsString, Interaction, ClientEvents } from "discord.js";
import { ClientEvent, SlashCommand, ToolBox, ClientOptions } from "./index.js";

export default class BootClient extends Client {
    membercount?: number;
    toolbox: ToolBox;
    assetFolders?: string[];

    constructor(options: ClientOptions) {
        super({ intents: options.intents as BitFieldResolvable<IntentsString, number>, allowedMentions: { parse: ["everyone", "roles"] } })
        this.toolbox = new ToolBox()
        this.assetFolders = options.assetFolders ?? undefined
    }

    async start(token: string) {
        if (this.assetFolders) {
            (await this.toolbox.loadAssetFolders(this.assetFolders))
            this.loadEvents()
        }
        this.login(token)
    }

    loadEvents() {
        this.toolbox.getAllAssets("EVENT").forEach(event => {
            this.on(event.name, (paramA: any, paramB: any) => {
                this.runEvent(event.name as keyof ClientEvents, paramA, paramB)
            })
        })
    }

    runEvent(name: keyof ClientEvents, paramA: any, paramB: any) {
        return this.toolbox.findAsset("EVENT", name as string)?.execute?.(this, paramA, paramB)
    }

    runSlashCommand(name: string, interaction: CommandInteraction) {
        const slashCommand = this.toolbox.findAsset("SLASH_COMMAND", name)
        if (!slashCommand || !(slashCommand instanceof SlashCommand)) return null

        const subCommand = interaction.options.data[0]?.type == "SUB_COMMAND" ? interaction.options.data[0]?.name : null
        if (subCommand) return slashCommand.run({ name: subCommand, toolbox: this.toolbox }, interaction)
        else return slashCommand.run({ toolbox: this.toolbox }, interaction)
    }
}
