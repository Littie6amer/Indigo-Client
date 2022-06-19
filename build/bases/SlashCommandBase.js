"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandBase = void 0;
class SlashCommandBase {
    constructor(options) {
        var _a, _b, _c;
        this.name = options.name;
        this.description = options.description;
        this.options = (_a = options.options) !== null && _a !== void 0 ? _a : [];
        this.subcommands = (_c = (_b = options.subcommands) === null || _b === void 0 ? void 0 : _b.map(subcommand => subcommand.makeSubcommand())) !== null && _c !== void 0 ? _c : [];
        this.isSubcommand = false;
    }
    run(optionNames, client, interaction) {
        // return console.log(optionNames)
        const subcommand = optionNames.length ? this.subcommands.find(subcommand => subcommand.name == optionNames[0]) : null;
        optionNames.shift();
        if (!subcommand)
            this.execute(client, interaction);
        else
            subcommand.run(optionNames, client, interaction);
    }
    execute(client, interaction) {
        interaction.reply("This command is missing any code to run!");
    }
    getData() {
        const { name, description, options, subcommands, isSubcommand } = this;
        const json = {
            name, description,
            options: [...options.map(option => this.getOptionData(option)), ...subcommands.map(subcommand => subcommand.getData())]
        };
        if (this.getType())
            json.type = this.getType();
        return json;
    }
    getJSON() {
        const { name, description, options, subcommands, isSubcommand } = this;
        const json = {
            name, description,
            options: [...options.map(option => this.getOptionJSON(option)), ...subcommands.map(subcommand => subcommand.getJSON())]
        };
        if (this.getType())
            json.type = this.getType();
        return json;
    }
    getOptionJSON(option) {
        const { name, description, required, choices, channel_types, min_value, max_value, autocomplete, type } = option;
        const json = { name, description, type };
        if (required)
            json.required = required;
        if (choices)
            json.choices = choices;
        if (channel_types === null || channel_types === void 0 ? void 0 : channel_types.length)
            json.channel_types = channel_types;
        if (min_value)
            json.min_value = min_value;
        if (max_value)
            json.max_value = max_value;
        if (autocomplete)
            json.autocomplete = autocomplete;
        return json;
    }
    getOptionData(option) {
        const { name, description, required, choices, channel_types, min_value, max_value, autocomplete } = option;
        const type = this.getOptionTypeValue(option.type);
        const json = { name, description, type, };
        if (required)
            json.required = required;
        if (choices)
            json.choices = choices;
        if (channel_types === null || channel_types === void 0 ? void 0 : channel_types.length)
            json.channel_types = channel_types.map(this.getOptionTypeValue);
        if (min_value)
            json.min_value = min_value;
        if (max_value)
            json.max_value = max_value;
        if (autocomplete)
            json.autocomplete = autocomplete;
        return json;
    }
    getOptionTypeValue(type) {
        const typeValues = {
            "STRING": 3, "INTEGER": 4, "BOOLEAN": 5, "USER": 6,
            "CHANNEL": 7, "ROLE": 8, "MENTIONABLE": 9, "NUMBER": 10,
            "ATTACHMENT": 11, "GUILD_TEXT": 0, "DM": 1, "GUILD_VOICE": 2,
            "GROUP_DM": 3, "GUILD_CATEGORY": 4, "GUILD_NEWS": 5, "GUILD_NEWS_THREAD": 10,
            "GUILD_PUBLIC_THREAD": 11, "GUILD_PRIVATE_THREAD": 12, "GUILD_STAGE_VOICE": 13, "GUILD_DIRECTORY": 14,
        };
        return typeValues[type];
    }
    getType() {
        if (!this.subcommands.length && this.isSubcommand)
            return 1;
        else if (this.subcommands.length && this.isSubcommand)
            return 2;
        else
            return undefined;
    }
    makeSubcommand() {
        this.isSubcommand = true;
        return this;
    }
}
exports.SlashCommandBase = SlashCommandBase;
