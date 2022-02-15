// asset builders
import SlashCommand from "./Structures/SlashCommand.js"
import ClientEvent from "./Structures/ClientEvent.js";

// other builders
import ValueOption from "./base-structures/ValueOption.js"
import OptionBase from "./base-structures/OptionBase.js";
import SubCommandOption from "./base-structures/SubCommandOption.js";

// other utils
import BootClient from "./BootClient.js"
import ToolBox from "./ToolBox.js";

// interfaces

import { BitFieldResolvable, IntentsString } from "discord.js";

interface ClientOptions {
    intents: BitFieldResolvable<IntentsString, number>,
    assetFolders?: string[],
    token?: string
}

interface subCommandOptions {
    description: string, options?: ValueOption[]
}

interface subCommandData extends subCommandOptions {
    name: string, execute: Function
}

interface slashCommandData {
    name: string,
    type?: 0 | 1 | 2,
    description?: string,
    options?:  optionData[]
}

interface optionData {
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    name: string,
    description?: string,
    required?: boolean,
    choices?: choice[],
    options?: optionData[],
    min_value?: number
    max_value?: number,
    autocomplete?: boolean,
    channel_types?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13)[]
}

interface choice {
    name: string,
    value: string | number
}

// values

const typeValues = {
    "SUB_COMMAND": 1,
    "STRING": 3,
    "INTEGER": 4,
    "BOOLEAN": 5,
    "USER": 6,
    "CHANNEL": 7,
    "ROLE": 8,
    "MENTION": 9,
    "NUMBER": 10
}

const channelTypeValues = {
    "TEXT": [0, 1, 3],
    "VOICE": [2],
    "CATEGORY": [4],
    "ANNOUNCEMENT": [5],
    "THREAD": [10, 11, 12],
    "STAGE": [13]
}

// types

type OptionTypes = "SUB_COMMAND" | "STRING" | "INTEGER" | "BOOLEAN" | "USER" | "ROLE" | "CHANNEL" | "MENTION" | "NUMBER"

export {
    SlashCommand, ClientEvent,
    ValueOption, OptionBase, SubCommandOption,
    BootClient, ToolBox,
    ClientOptions, subCommandOptions, subCommandData, slashCommandData, optionData, choice,
    OptionTypes,
    typeValues, channelTypeValues
}
