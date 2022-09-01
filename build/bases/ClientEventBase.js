"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEventBase = void 0;
class ClientEventBase {
    constructor(client, options) {
        this.client = client;
        this.name = options.name;
    }
    execute(...data) {
        console.log(`[${this.name}] No execute function set!`);
    }
}
exports.ClientEventBase = ClientEventBase;
