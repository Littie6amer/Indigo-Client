module.exports = async (client, interaction) => {
    
    if (interaction.customId == 'templateSelect') {
        interaction.deferUpdate();
        if (interaction.values[0] == 'opt1') m.edit("Option 1 Selected")
        if (interaction.values[0] == 'opt2') m.edit("Option 2 Selected")
    }

}