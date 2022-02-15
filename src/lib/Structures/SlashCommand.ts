import { ValueOption, optionData, slashCommandData, subCommandData, OptionBase, OptionTypes, SubCommandOption } from "../index.js"
import { CommandInteraction } from "discord.js"
import ToolBox from "../ToolBox.js";

export default class SlashCommand {
    readonly type: "SLASH_COMMAND" = "SLASH_COMMAND";
    name: string;
    description: string;
    options: OptionBase[];
    execute?: Function;

    constructor(data: { name: string, execute?: (ctx: CommandInteraction, toolbox: ToolBox) => any, description: string }) {
        this.name = data.name
        this.description = data.description
        this.execute = data.execute
        this.options = []
        return this
    }

    // Add a option
    addOption(data: OptionBase) {
        if (!this.getOption(data.type, data.name)) this.options.push(data)
        return this
    }
    
    setOptions(data: OptionBase[]) {
        this.options = data
        return this
    }

    // Find a option
    getOption(type: OptionTypes, name: string) {
        console.log(this.options, this.options.find(o => o.name == name && o.type == type))
        if (this.options.findIndex(o => o.name == name && o.type == type) == -1) return null
        return this.options.find(o => o.name == name && o.type == type)
    }

    getAllOptions(type: OptionTypes) {
        return this.options.filter(o => o.type == type)
    }

    // Run a sub command
    run(options: { name?: string, toolbox: ToolBox }, interaction: CommandInteraction) {
        let option = options.name ? this.getOption("SUB_COMMAND", options.name) : this
        if (option instanceof SlashCommand || option instanceof SubCommandOption) return option.execute?.(interaction, options.toolbox)
        else return;
    }

    // Get the slash command data
    getData() {
        const data: slashCommandData = {
            name: this.name,
            description: this.description,
            options: this.options?.map(o => o.getData())
        }
        return data
    }
}