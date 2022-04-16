"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEventBase = void 0;
class ClientEventBase {
    constructor(options) {
        this.name = options.name;
    }
    execute(client, ...data) {
        console.log(`[${this.name}] No execute function set!`);
    }
}
exports.ClientEventBase = ClientEventBase;
