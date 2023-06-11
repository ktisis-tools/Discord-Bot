import { Client, Guild, Member } from "eris";
import { extraRoles, roleToAdd, roleTriggers } from "../util/config";

export default async (client: Client, guild: Guild, member: Member) => {
  if (guild.id !== process.env.DISCORD_GUILD_ID) return;

  if (member.bot) return;

  const roles = member.roles.slice();
  const roleIndex = roles.indexOf(roleToAdd);

  let action: 'added' | 'removed' | null = null;

  if (roles.some(r => roleTriggers.includes(r))) {
    if (roleIndex < 0) {
      roles.push(roleToAdd);
      action = 'added';
    }
  } else {
    if (roles.includes(roleToAdd)) {
      roles.splice(roleIndex, 1);
      action = 'removed';
    }

    /**
     * Remove all roles previously given by other means, regardless of action.
     * Action does not change if any roles are removed, as it was not a trigger or target role of primary focus.
     */
    for (const extraRole of extraRoles) {
      const targetIndex = roles.indexOf(extraRole);

      if (targetIndex >= 0) {
        roles.splice(targetIndex, 1);
      }
    }
  }

  if (roles.length !== member.roles.length) {
    const reason = `Role was ${action}`;

    await member.edit({ roles }, `${reason}. (Gateway)`);
    
    console.log(`[${new Date().toUTCString()}] Role ${roleToAdd} was ${action} for ${member.username}.`);
  }
}