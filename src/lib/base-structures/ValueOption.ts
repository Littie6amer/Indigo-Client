import { channelTypeValues, choice, optionData, typeValues } from "../index.js";
import OptionBase from "./OptionBase.js";

export default class ValueOption extends OptionBase {
    required?: boolean;
    choices?: choice[];
    channel_types?: ("TEXT" | "CATEGORY" | "ANNOUNCEMENT" | "THREAD" | "STAGE")[];
    valueLimit?: [number?, number?];

    constructor(data: { name: string, type: "STRING" | "NUMBER" | "BOOLEAN" | "USER" | "ROLE" | "CHANNEL" | "MENTION", description: string }) {
        super(data)
    }

    setRequired() {
        this.required = true
        return this
    }

    setValueLimit(min: number, max?: number) {
        this.valueLimit = [min, max]
        return this
    }

    setMinValues(min: number) {
        this.valueLimit = [min, this.valueLimit?.[1]]
        return this
    }

    setMaxValues(max: number) {
        this.valueLimit = [this.valueLimit?.[0], max]
        return this
    }


    setChannelTypes(types: ("TEXT" | "CATEGORY" | "ANNOUNCEMENT" | "THREAD" | "STAGE")[]) {
        this.channel_types = types
        return this
    }

    addChannelType(type: "TEXT" | "CATEGORY" | "ANNOUNCEMENT" | "THREAD" | "STAGE") {
        if (!this.channel_types) this.channel_types = [type]
        else this.channel_types.push(type)
        return this
    }

    setChoices(choices: choice[]) {
        this.choices = choices
        return this
    }

    addChoice(name: string, value: string | number) {
        if (!this.choices) this.choices = [{ name, value }]
        else this.choices.push({ name, value });
        return this
    }

    getData() {
        let data: optionData = {
            type: this.getTypeValue(),
            name: this.name,
            description: this.description,
        }
        if (this.required) data.required = this.required
        if (this.choices) data.choices = this.choices
        if (this.valueLimit?.[0]) data.min_value = this.valueLimit[0]
        if (this.valueLimit?.[1]) data.max_value = this.valueLimit[1]
        if (this.channel_types) data.autocomplete = true
        if (this.getChannelTypeValues().length) data.channel_types = this.getChannelTypeValues()
        return data
    }

    getChannelTypeValues(channelType?: "TEXT" | "CATEGORY" | "ANNOUNCEMENT" | "THREAD" | "STAGE" | undefined) {
        let values: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13)[] = []
        if (!channelType) this.channel_types?.forEach(t => { values.push(...this.getChannelTypeValues(t)) })
        else values = channelTypeValues[channelType] as (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13)[]
        return values
    }
}