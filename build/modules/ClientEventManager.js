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
exports.ClientEventManager = void 0;
const __1 = require("..");
const FileUtilties_1 = require("./FileUtilties");
class ClientEventManager extends FileUtilties_1.FileUtilties {
    constructor(options) {
        super();
        this.events = [];
        this.client = options.client;
        const folders = options.folders;
        if (folders === null || folders === void 0 ? void 0 : folders.length) {
            console.log(`[EventManager] Searching folders: ${folders.join(", ")}`);
            this.registerDirectories(folders);
        }
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
                if (!this.events.find(e => e.name == events[event].name))
                    yield this.client.on(events[event].name, (...data) => this.runEvent(events[event].name, ...data));
                this.events.push(events[event]);
            }
        });
    }
    registerEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[EventManager] Now listening for: ${event.name}`);
            if (!this.events.find(e => e.name == event.name))
                yield this.client.on(event.name, (...data) => this.runEvent(event.name, ...data));
            this.events.push(event);
        });
    }
    runEvent(name, ...data) {
        return __awaiter(this, void 0, void 0, function* () {
            let events = this.events.filter(e => e.name == name);
            if (events.length)
                events.forEach(event => {
                    event.execute(this.client, ...data);
                });
        });
    }
}
exports.ClientEventManager = ClientEventManager;
