import { optionData, OptionTypes, SlashCommand, ValueOption } from "../index.js";
import { CommandInteraction } from "discord.js"
import OptionBase from "./OptionBase.js";
import ToolBox from "../ToolBox.js";

export default class SubCommandOption extends OptionBase {
    options: OptionBase[];
    execute?: Function;

    constructor(data: { name: string, description: string, execute?: (interaction: CommandInteraction, toolbox: ToolBox) => any }) {
        super({ name: data.name, description: data.description, type: "SUB_COMMAND" })
        this.options = []
        this.execute = data.execute
    }

    // Add a option
    addOption(data: OptionBase) {
        if (!this.getOption(data.type, data.name)) this.options.push(data)
        return this
    }

    setOptions(options: OptionBase[]) {
        this.options = options
        return this
    }

    // Find a option
    getOption(type: OptionTypes, name: string) {
        if (this.options.findIndex(o => o.name == name && o.type == type) == -1) return null
        return this.options.find(o => o.name == name && o.type == type)
    }

    getAllOptions(type: OptionTypes | undefined) {
        return this.options.filter(o => o.type == type)
    }

    getData() {
        let data: optionData = {
            type: this.getTypeValue(),
            name: this.name,
            description: this.description
        }
        if (this.options.length) data.options = this.options?.map(o => o.getData())
        return data
    }

    run(options: { name?: string, toolbox: ToolBox }, interaction: CommandInteraction) {
        let option = options.name ? this.getOption("SUB_COMMAND", options.name) : this
        if (option instanceof SlashCommand || option instanceof SubCommandOption) return option.execute?.(interaction, options.toolbox)
        else return;
    }
}
