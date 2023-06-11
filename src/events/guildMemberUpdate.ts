import { Client, Guild, Member } from "eris";

import { extraRoles, roleToAdd } from "../util/config";
import { hasSomeTrigger, updateMemberRoles } from "../util/common";
import { RoleAction, RoleSource } from "../util/types";

export default async (client: Client, guild: Guild, member: Member) => {
  if (guild.id !== process.env.DISCORD_GUILD_ID) return;

  if (member.bot) return;

  const roles = member.roles.slice();
  const roleIndex = roles.indexOf(roleToAdd);

  let action: RoleAction = null;

  if (hasSomeTrigger(roles)) {
    if (roleIndex < 0) {
      roles.push(roleToAdd);
      action = RoleAction.ADDED;
    }
  } else {
    if (roles.includes(roleToAdd)) {
      roles.splice(roleIndex, 1);
      action = RoleAction.REMOVED;
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

  updateMemberRoles(member, roles, action, RoleSource.GATEWAY);
}