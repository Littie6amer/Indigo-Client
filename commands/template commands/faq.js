const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
const { Command, simpleEmbed } = require('../../utils')

// Create a new command
const command = module.exports = new Command()

command
    // Set (a) name(s), a description and cooldown for the command
    .create("faq", "A faq page for your server!", 10000)
    // Set a command restriction. You can create your own in config.json
    .setRestriction("dev")
    // Set the code that the command will run
    .setExecute(execute)
    // Make it run as a slash command
    .makeSlashCommand()
    // Set the code that will run for the dropdown interactions
    .addDropOption("faqSelect", ["faq:1", "faq:2", "faq:3", "faq:4"], dropDownExecute)
    // Set the code taht will run for the button
    .addButton("faq:moreinfo", buttonExecute)

const questions = {
    "faq:1": { question: "What color is the sky?", answer: "Blue." },
    "faq:2": { question: "Am I, a good bot?", answer: "Yes." },
    "faq:3": { question: "Is javascript the best?", answer: "Of course!" },
    "faq:4": { question: "Have you ran out of ideas?", answer: "Yes..." }
}

const options = []; Object.keys(questions).forEach(q => { options.push({ label: questions[q].question, value: q }) });


// Code set to execute
function execute(toolbox) {
    const request = toolbox.message||toolbox.interaction
    request.reply({
        embeds: [simpleEmbed("FAQ", "Select a question below")],
        components: [
            new MessageActionRow().addComponents([
                new MessageSelectMenu()
                    .setCustomId('faqSelect')
                    .setPlaceholder('Pick an question...')
                    .addOptions(options),
            ]),
            new MessageActionRow().addComponents([new MessageButton().setLabel('More Info').setCustomId("faq:moreinfo").setStyle('SECONDARY')
        ])]
    })
}

function dropDownExecute(toolbox) {
    const { interaction } = toolbox
    interaction.reply({
        embeds: [
            simpleEmbed(questions[interaction.values[0]].question, questions[interaction.values[0]].answer)
        ], ephemeral: true
    })
}

function buttonExecute (toolbox) {
    const {interaction} = toolbox
    interaction.reply({
        content: "The wonderful questions that people ask often", ephemeral: true
    })
}