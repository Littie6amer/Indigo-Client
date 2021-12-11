const [{ REST }, { Routes }, { Client }] = [require('@discordjs/rest'), require('discord-api-types/v9'), require('discord.js')]
const [config, env, fs] = [require('../data/config.json'), require("dotenv"), require("fs")]
env.config()
const rest = new REST({ version: '9' }).setToken(process.env.token);
const commands = [], commandNames = []

const client = new Client({ intents: [] });

loadFolder('./commands')
console.log(`~~~`)

client.on("ready", async () => {
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );

    console.log(`[${config.name}]: ${commands.length} command(s) deployed!`)
    console.log(`[${config.name}]: /${commandNames.join(' /')}`)
  } catch (error) {
    console.error(error);
  }

  client.destroy()
})

client.login(process.env.token)

function loadFolder(path) {
  fs.readdirSync(path).forEach(c => {
    let path_ = path + '/' + c
    if (!path_.slice(1).includes('.')) {
      console.log(`[${config.name}]: Searching ${path_}`)
      loadFolder(path_)
    }
    if (!path_.endsWith('.js')) { } else {
      c = require("."+path_)

      if (c.slashExecute) {
        commands.push({
          name: c.names[0],
          description: c.description,
          options: c.slashOptions
        })
        commandNames.push(c.names[0])
      }

    }
  })
}