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
exports.SlashCommandManager = void 0;
const SlashCommandBase_1 = require("../bases/SlashCommandBase");
const FileUtilties_1 = require("./FileUtilties");
class SlashCommandManager extends FileUtilties_1.FileUtilties {
    constructor(options) {
        super();
        this.client = options.client;
        this.slashcommands = [];
        const folders = options.folders;
        if (folders === null || folders === void 0 ? void 0 : folders.length) {
            console.log(`[SlashCommandManager] Searching folders: ${folders.join(", ")}`);
            this.registerDirectories(folders);
        }
    }
    importFromFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { default: raw } = yield Promise.resolve().then(() => __importStar(require(filePath))).catch((err) => console.log(`[FileUtilties] Unable to import ${filePath}\n${err}`));
            const data = Object.getPrototypeOf(raw) ? new raw(this.client) : raw;
            return data;
        });
    }
    registerDirectories(folders) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let index = 0; index < folders.length; index++) {
                yield this.registerDirectory(folders[index]);
            }
        });
    }
    registerDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const slashcommands = (yield this.importFromDirectory(directoryPath)).filter(slashcommand => slashcommand instanceof SlashCommandBase_1.SlashCommandBase);
            yield this.registerSlashCommands(slashcommands);
        });
    }
    registerSlashCommands(slashcommands) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!slashcommands.length)
                return;
            for (let slashcommand in slashcommands) {
                this.slashcommands.push(slashcommands[slashcommand]);
            }
        });
    }
    registerSlashCommand(slashcommand) {
        return __awaiter(this, void 0, void 0, function* () {
            this.slashcommands.push(slashcommand);
        });
    }
    run(name, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let slashcommands = this.slashcommands.filter(s => s.name == name);
            if (slashcommands.length)
                slashcommands.forEach(slashcommand => {
                    slashcommand.run(getSubcommands(interaction.options.data[0]), interaction);
                });
            function getSubcommands(option) {
                if (!(option === null || option === void 0 ? void 0 : option.options))
                    return [];
                return [option.name, ...getSubcommands(option.options[0])];
            }
        });
    }
    _inDev_Deploy(name, guildId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const command = yield ((_a = this.client.application) === null || _a === void 0 ? void 0 : _a.commands.cache.filter(c => !guildId || c.guildId == guildId).find(c => c.name == name));
            const slashcommand = this.slashcommands.find(s => s.name == name);
            if (!slashcommand)
                return;
            if (command)
                (_b = this.client.application) === null || _b === void 0 ? void 0 : _b.commands.edit(command, slashcommand.getData()).catch();
            else
                (_c = this.client.application) === null || _c === void 0 ? void 0 : _c.commands.create(slashcommand.getData(), guildId).catch();
        });
    }
    _inDev_Delete(name, guildId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const command = yield ((_a = this.client.application) === null || _a === void 0 ? void 0 : _a.commands.cache.filter(c => !guildId || c.guildId == guildId).find(c => c.name == name));
            const slashcommand = this.slashcommands.find(s => s.name == name);
            if (!slashcommand)
                return;
            if (command)
                (_b = this.client.application) === null || _b === void 0 ? void 0 : _b.commands.delete(command, guildId).catch();
        });
    }
}
exports.SlashCommandManager = SlashCommandManager;
// export class SlashCommandManager {
//     slashcommands: SlashCommandBase[]
//     client: Client;
//     constructor(options: SlashCommandManagerOptions) {
//         this.client = options.client
//         this.slashcommands = []
//         const folders = options.folders
//         if (folders?.length) {
//             console.log(`[SlashCommandManager] Searching folders: ${folders.join(", ")}`)
//             // this.registerDirectories(folders)
//         }
//     }
//     async _inDev_Deploy(name: string, guildId?: string) {
//         const command = await this.client.application?.commands.cache.filter(c => !guildId || c.guildId == guildId).find(c => c.name == name)
//         const slashcommand = this.slashcommands.find(s => s.name == name)
//         if (!slashcommand) return
//         if (command) this.client.application?.commands.edit(command, slashcommand.getData() as ApplicationCommandDataResolvable).catch()
//         else this.client.application?.commands.create(slashcommand.getData() as ApplicationCommandDataResolvable, guildId).catch()
//     }
// }
