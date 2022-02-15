import { BootClient, ValueOption } from "./lib/index.js"
import { Intents } from "discord.js"
import dotenv from 'dotenv'
dotenv.config()

const client = new BootClient({
    intents: ["GUILDS"],
    assetFolders: ["assets"],
})

if (process.env.BOT_TOKEN) client.start(process.env.BOT_TOKEN)

//console.log(new ValueOption({ name: "description", type: "STRING", description: "Embed Description" }).setRequired())