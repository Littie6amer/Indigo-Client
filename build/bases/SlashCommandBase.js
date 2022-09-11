"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandBase = void 0;
const discord_js_1 = require("discord.js");
class SlashCommandBase {
    constructor(client, options) {
        var _a, _b, _c;
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.options = (_a = options.options) !== null && _a !== void 0 ? _a : [];
        this.subcommands = (_c = (_b = options.subcommands) === null || _b === void 0 ? void 0 : _b.map(subcommand => subcommand.makeSubcommand())) !== null && _c !== void 0 ? _c : [];
        this.isSubcommand = false;
        this.required_permissions = options.permissions;
    }
    run(optionNames, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const subcommand = optionNames.length ? this.subcommands.find(subcommand => subcommand.name == optionNames[0]) : null;
            optionNames.shift();
            if (!subcommand) {
                let passed = (yield this.permissionCheck(interaction)).passed && this.prechecks(interaction).passed;
                if (passed)
                    this.execute(interaction);
                else
                    return;
            }
            else
                subcommand.run(optionNames, interaction);
        });
    }
    permissionCheck(interaction) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            let passed = true;
            if (!this.required_permissions || ((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.isDMBased()))
                return { passed };
            const required_author_permissions = this.required_permissions.author;
            const required_bot_permissions = this.required_permissions.bot;
            const author = interaction.member;
            const bot = (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.members.cache.get(((_c = this.client.user) === null || _c === void 0 ? void 0 : _c.id) || "");
            const missing_permissions = {};
            const checkChannelPermissions = (member, perms) => {
                var _a;
                if (!(perms === null || perms === void 0 ? void 0 : perms.length))
                    return;
                // @ts-ignore
                const channel_perms = (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.permissionsFor(member.id);
                perms = perms.filter(p => !channel_perms.has(p));
                if (!perms.length)
                    return;
                passed = false;
                missing_permissions[member.id] = Object.assign(Object.assign({}, (missing_permissions[member.id] || {})), { channel: perms });
            };
            const checkGuildPermissions = (member, perms) => {
                if (!(perms === null || perms === void 0 ? void 0 : perms.length))
                    return;
                // @ts-ignore
                const guild_perms = member.permissions;
                perms = perms.filter(p => !guild_perms.has(p));
                if (!perms.length)
                    return;
                passed = false;
                missing_permissions[member.id] = Object.assign(Object.assign({}, (missing_permissions[member.id] || {})), { guild: perms });
            };
            checkGuildPermissions(author, required_author_permissions === null || required_author_permissions === void 0 ? void 0 : required_author_permissions.guild);
            checkChannelPermissions(author, required_author_permissions === null || required_author_permissions === void 0 ? void 0 : required_author_permissions.channel);
            checkGuildPermissions(bot, required_bot_permissions === null || required_bot_permissions === void 0 ? void 0 : required_bot_permissions.guild);
            checkChannelPermissions(bot, required_bot_permissions === null || required_bot_permissions === void 0 ? void 0 : required_bot_permissions.channel);
            for (let userId in missing_permissions) {
                const perms = missing_permissions[userId];
                const member = userId === bot.id ? bot : author;
                const fields = [];
                if (perms.guild)
                    fields.push({ name: `${(_d = interaction.guild) === null || _d === void 0 ? void 0 : _d.name} (This Server)`, value: "> `" + perms.guild.join("`\n> `") + "`" });
                // @ts-ignore
                if (perms.channel)
                    fields.push({ name: `# ${interaction.channel.name} (This Channel)`, value: "> `" + perms.channel.join("`\n> `") + "`" });
                const embed = new discord_js_1.EmbedBuilder()
                    .setAuthor({ name: `${member.user.username}` })
                    .setDescription(`Missing perms.`)
                    .setFields(fields)
                    .setColor(this.client.embedColor);
                const message = { embeds: [embed] };
                member === bot && missing_permissions[author.id] ? (yield interaction.fetchReply()).reply(message) : interaction.reply(message);
            }
            return { passed };
        });
    }
    prechecks(interaction) {
        return { passed: true };
    }
    execute(interaction) {
        return interaction.reply({ embeds: [this.client.toolbox.simpleEmbed("This command is missing an execute function!")] });
    }
    getData() {
        const { name, description, options, subcommands } = this;
        const json = {
            name, description,
            options: [...options.map(option => this.getOptionData(option)), ...subcommands.map(subcommand => subcommand.getData())]
        };
        if (this.getType())
            json.type = this.getType();
        //if (this.user_permissions.length) json.default_member_permissions = new PermissionsBitField(this.user_permissions).bitfield
        return json;
    }
    getJSON() {
        const { name, description, options, subcommands } = this;
        const json = {
            name, description,
            options: [...options.map(option => this.getOptionJSON(option)), ...subcommands.map(subcommand => subcommand.getJSON())]
        };
        if (this.getType())
            json.type = this.getType();
        //if (this.user_permissions.length) json.default_member_permissions = new PermissionsBitField(this.user_permissions).bitfield
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
        const json = { name, description, type };
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
