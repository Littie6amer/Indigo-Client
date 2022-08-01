
<h1  style="color: #fff"><span style="background-color: #8e0af0; padding: 5px; color: #fff; font-weight: 600; border-radius: 5px">Indigo</span> Extended Discord.js Client</h1>

A package that extends discord.js's client and focuses on additional utility, quality of life and organisation.


## Package Features

- Slash Command Manager
- Client Event Manager
- Quick To Develop

## Installing Indigo Client

Indigo Client uses discord.js v14 and be installed with the command:
```
npm i https://github.com/Littie6amer/Indigo-Client discord.js
```

## Creating a bot client
This is where indigo will auto load any events or commands your bot might have.
### TypeScript
```
import { Client } from "indigo-client"
import { IntentsBitField } from "discord.js"

const client = new Client({
    intents: [
        IntentsBitField.Flags.MessageContent, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.Guilds
    ], // Bot Intents
    eventFolders: ["events"], // The event folder
    commandFolders: ["commands"] // The command folder
    mobileStatus: false // Mobile icon status
})

client.login("BOT TOKEN")
```
### Javascript
```
const { Client } = require("indigo-client")
const { IntentsBitField } = require("discord.js")

const client = new Client({
    intents: [
        IntentsBitField.Flags.MessageContent, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.Guilds
    ], // Bot Intents
    eventFolders: ["events"], // The event folder
    commandFolders: ["commands"] // The command folder
    mobileStatus: false // Mobile icon status
})

client.login("BOT TOKEN")
```

## Creating a new client event
Make a new file in your event folder and paste the following

### TypeScript
```
import { Client, ClientEventBase } from "indigo-client"

export default class ClientEvent extends ClientEventBase {
    constructor (client: Client) {
        super(client, {
            name: "EVENT NAME"
        })
    }

    execute () {
        console.log(`The event ${this.name} was emitted.`)
    }
}
```
### JavaScript
```
Object.defineProperty(exports, "__esModule", { value: true });
const { ClientEventBase } = require("indigo-client")

class ClientEvent extends ClientEventBase {
    constructor (client) {
        super(client, {
            name: "ready"
        })
    }

    execute () {
        console.log(`The event ${this.name} was emitted.`)
    }
}

exports.default = ClientEvent
```