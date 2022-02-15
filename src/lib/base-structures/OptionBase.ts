import { optionData, OptionTypes, typeValues } from "../index.js";

export default class OptionBase {
    name: string;
    type: OptionTypes;
    description: string;

    constructor(data: {name: string, type: OptionTypes, description: string}) {
        this.name = data.name
        this.type = data.type
        this.description = data.description
    }

    getData() {
        let data: optionData = {
            type: this.getTypeValue(), 
            name: this.name,
            description: this.description
        }
        return data
    }

    getTypeValue() {
        return typeValues[this.type] as (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10)
    }
}