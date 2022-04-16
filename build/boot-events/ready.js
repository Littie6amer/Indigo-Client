"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class Event extends __1.ClientEventBase {
    constructor() {
        super({ name: "ready" });
    }
    execute(client, ...data) {
        var _a;
        console.log(`[${this.name}] Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
        console.log(`[${this.name}] Watching ${client.guilds.cache.size} servers!`);
    }
}
exports.default = Event;
