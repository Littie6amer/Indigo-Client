"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientEventBase_1 = require("../bases/ClientEventBase");
class Event extends ClientEventBase_1.ClientEventBase {
    constructor(client) {
        super(client, { name: "interactionCreate" });
    }
    execute(interaction) {
        if (interaction.guild && interaction.isChatInputCommand())
            this.client.commandManager.run(interaction.commandName, interaction);
    }
}
exports.default = Event;
