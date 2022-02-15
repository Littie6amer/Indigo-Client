// import { CommandInteraction, Client, Interaction } from "discord.js"
//
// export class BootCommandInteraction extends CommandInteraction {
//   name: string;
//   subCommand: string | null;
//
//   constructor(client: Client, interaction: CommandInteraction) {
//     super(client, { application_id: client.user?.id, channel_id: interaction.channel?.id, data: interaction.options.data, guild_id: interaction.guildId, id: interaction.id, member: interaction.member, user: interaction.user})
//     this.name = interaction.commandName
//     this.subCommand = interaction.options.data[0]?.type == "SUB_COMMAND" ? interaction.options.data[0]?.name : null
//   }
// }
