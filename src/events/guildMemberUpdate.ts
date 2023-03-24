import { Client, Guild, Member } from "eris";
import { grantedRoles, roleToAdd, roleTriggers } from "../util/config";

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
     * Remove all roles previously granted by other means, regardless of action.
     * Action does not change if any roles are removed, as it was not a trigger or target role of primary focus.
     */
    for (const grantedRole of grantedRoles) {
      const targetIndex = roles.indexOf(grantedRole);

      if (targetIndex >= 0) {
        roles.splice(targetIndex, 1);
      }
    }
  }

  if (roles.length !== member.roles.length) {
    await member.edit({ roles });

    if (action) {
      console.log(`[${new Date().toUTCString()}] Role ${roleToAdd} was ${action} for ${member.username}.`);
    }
  }
}