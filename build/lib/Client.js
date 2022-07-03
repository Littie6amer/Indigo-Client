"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const DiscordJS = __importStar(require("discord.js"));
const path_1 = __importDefault(require("path"));
const __1 = require("..");
const Toolbox_1 = require("../modules/Toolbox");
const SlashCommandManager_1 = require("../modules/SlashCommandManager");
class Client extends DiscordJS.Client {
    constructor(options) {
        var _a, _b, _c;
        super({ intents: options.intents, ws: { properties: { browser: options.mobileStatus ? "Discord iOS" : undefined } } });
        this.rootPath = ((_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.path) || "";
        const eventFolders = ((_b = options.eventFolders) === null || _b === void 0 ? void 0 : _b.map(folder => this.rootPath + path_1.default.sep + folder)) || [];
        if ((options === null || options === void 0 ? void 0 : options.defaultEvents) !== false)
            eventFolders === null || eventFolders === void 0 ? void 0 : eventFolders.push(path_1.default.resolve(__dirname, "../default-events"));
        this.eventManager = new __1.ClientEventManager({ client: this, folders: eventFolders });
        this.toolbox = new Toolbox_1.Toolbox();
        const slashCommandFolders = ((_c = options.slashCommandFolders) === null || _c === void 0 ? void 0 : _c.map(folder => this.rootPath + path_1.default.sep + folder)) || [];
        this.slashCommandManager = new SlashCommandManager_1.SlashCommandManager({ client: this, folders: slashCommandFolders });
        if (options === null || options === void 0 ? void 0 : options.events)
            this.eventManager.registerEvents(options.events);
    }
}
exports.Client = Client;
