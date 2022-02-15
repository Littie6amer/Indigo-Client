import { ToolBox } from "../lib/index.js";

const toolbox = new ToolBox()
import dotenv from 'dotenv'
dotenv.config();

toolbox.loadAssetFolder("assets").then(() => {
    if (process.env.BOT_TOKEN) toolbox.deploySlashCommands(process.env.BOT_TOKEN, "939949067637760050")
})