import { Channel, CommandInteraction, GuildMember, PermissionFlags } from "discord.js";
export declare class CommandContext {
    interaction: CommandInteraction;
    id: string;
    me: GuildMember;
    constructor(interaction: CommandInteraction);
    checkPermissions(type: "Guild" | "Channel", options: {
        member: GuildMember;
        channel?: Channel;
        permissions: (keyof PermissionFlags)[];
    }): (true | false);
}
