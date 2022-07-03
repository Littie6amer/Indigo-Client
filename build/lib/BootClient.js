"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootClient = void 0;
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const __1 = require("..");
const Toolbox_1 = require("./modules/Toolbox");
const SlashCommandManager_1 = require("./SlashCommandManager");
class BootClient extends discord_js_1.Client {
    constructor(options) {
        var _a, _b, _c;
        super({ intents: options.intents, ws: { properties: { browser: options.mobile ? "Discord iOS" : undefined } } });
        this.rootPath = ((_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.path) || "";
        const eventFolders = ((_b = options.eventFolders) === null || _b === void 0 ? void 0 : _b.map(folder => this.rootPath + path_1.default.sep + folder)) || [];
        if ((options === null || options === void 0 ? void 0 : options.defaultEvents) !== false)
            eventFolders === null || eventFolders === void 0 ? void 0 : eventFolders.push(path_1.default.resolve(__dirname, "../defualt-events"));
        this.eventManager = new __1.ClientEventManager({ client: this, folders: eventFolders });
        this.toolbox = new Toolbox_1.Toolbox();
        const slashCommandFolders = ((_c = options.slashCommandFolders) === null || _c === void 0 ? void 0 : _c.map(folder => this.rootPath + path_1.default.sep + folder)) || [];
        this.slashCommandManager = new SlashCommandManager_1.SlashCommandManager({ client: this, folders: slashCommandFolders });
        if (options === null || options === void 0 ? void 0 : options.events)
            this.eventManager.registerEvents(options.events);
    }
}
exports.BootClient = BootClient;
