const interactionInterface = require('../modules/interactionInterface')

module.exports = async (client, interaction) => {
    interaction.client = client

    interactionInterface(interaction)

    // Your code here
}