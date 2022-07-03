<div>
<h1><span>Indigo</span> Extended Discord.js Client</h1>
<p>A package that extends discord.js's client and focuses on additional utility, quality of life and organisation.</p>
<h2>Package Features</h2>
<ul>
    <li>Slash Command Manager</li>
    <li>Client Event Manager</li>
    <li>Quick To Develop</li>
</ul><style>
    @import url('https://fonts.googleapis.com/css2?family=Finlandica&display=swap');
    h1, h2 {
        color: #fff
    }
    h1 span {
        background-color: #8e0af0; padding: 5px; color: #fff; font-weight: 600; border-radius: 5px
    }
    p {
        font-size: 15px; width: 75%
    }
    ul {
        list-style: none;
        padding-left: 1.8em;
    }
    ul li {
        border-bottom: 1px #333 solid;
    }
    ul li::before {
        content: "$";
        color: #8e0af0;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
        padding: .5em;
        font-size: 20px
    }
</style>
</div>

## Get Started
Install Indigo Client using NPM
```
npm i https://github.com/Littie6amer/Indigo-Client
```
Import Indigo Client and create a new bot client.
```import { Client } from "indigo-client"import { IntentsBitField } from "discord.js"const client = new Client({
intents: [
        IntentsBitField.Flags.MessageContent, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.Guilds
    ], // Bot Intents
    eventFolders: ["events"], // the folder where the event files are
    slashCommandFolders: ["commands"] // the folder where the commands are
    mobile: false // whether it should ahve a mobile icon
})
```
