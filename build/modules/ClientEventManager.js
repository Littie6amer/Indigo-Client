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
exports.ClientEventManager = void 0;
const __1 = require("..");
const FileUtilties_1 = require("./FileUtilties");
class ClientEventManager extends FileUtilties_1.FileUtilties {
    constructor(options) {
        super();
        this.client = options.client;
        const { events, folders } = options;
        if (folders === null || folders === void 0 ? void 0 : folders.length) {
            console.log(`[EventManager] Searching folders: ${folders.join(", ")}`);
            this.registerDirectories(folders);
        }
        if (events === null || events === void 0 ? void 0 : events.length) {
            console.log(`[EventManager] Adding events: ${events.map(e => e.name).join()}`);
            this.registerEvents(events);
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
            const events = (yield this.importFromDirectory(directoryPath)).filter(event => event instanceof __1.ClientEventBase);
            yield this.registerEvents(events);
        });
    }
    registerEvents(events) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!events.length)
                return;
            console.log(`[EventManager] Now listening for: ${events.map(event => event.name).join(", ")}`);
            for (let event in events) {
                if (!this.client.events.find(e => e.name == events[event].name))
                    yield this.client.on(events[event].name, (...data) => this.runEvent(events[event].name, ...data));
                this.client.events.push(events[event]);
            }
        });
    }
    registerEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[EventManager] Now listening for: ${event.name}`);
            if (!this.client.events.find(e => e.name == event.name))
                yield this.client.on(event.name, (...data) => this.runEvent(event.name, ...data));
            this.client.events.push(event);
        });
    }
    runEvent(name, ...data) {
        return __awaiter(this, void 0, void 0, function* () {
            let events = this.client.events.filter(e => e.name == name);
            if (events.length)
                events.forEach(event => {
                    event.execute(...data);
                });
        });
    }
}
exports.ClientEventManager = ClientEventManager;
