"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientEventBase_1 = require("../bases/ClientEventBase");
class Event extends ClientEventBase_1.ClientEventBase {
    constructor() {
        super({ name: "interactionCreate" });
    }
    execute(client, interaction) {
        if (interaction.isCommand())
            client.slashCommandManager.runSlashCommand(interaction.commandName, interaction);
    }
}
exports.default = Event;
