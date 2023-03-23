import { Client, Guild, Member } from "eris";
import { roleToAdd, roleTriggers } from "../util/config";

export default (client: Client, guild: Guild, member: Member) => {
  if (guild.id !== process.env.DISCORD_GUILD_ID) return;

  const roles = member.roles.slice();

  let action: 'added' | 'removed' | null = null;

  if (roles.some(r => roleTriggers.includes(r))) {
    if (!roles.includes(roleToAdd)) {
      member.addRole(roleToAdd);
      action = 'added';
    }
  } else {
    if (roles.includes(roleToAdd)) {
      member.removeRole(roleToAdd);
      action = 'removed';
    }
  }

  if (action) {
    console.log(`[${new Date().toUTCString()}] Role ${roleToAdd} was ${action} for ${member.username}.`);
  }
}