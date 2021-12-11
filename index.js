const { Client } = require('discord.js')
const fs = require('fs')

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"],
})

const loader = require('./modules/loader')
Object.assign(client, loader)

// Create Listeners

fs.readdirSync('./events').forEach(e => {
    if (!e.endsWith('.js')) return
    client.on(e.slice(0, -3), (a, b) => {
        (require('./events/' + e))(client, a, b)
    })
})

// Login to the bot

require('dotenv').config()
client.login(process.env.token)