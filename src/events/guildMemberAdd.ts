import { Client, Guild, Member } from "eris";

import { roleToAdd } from "../util/config";
import { hasSomeTrigger, updateMemberRoles } from "../util/common";
import { RoleAction, RoleSource } from "../util/types";

export default async (client: Client, guild: Guild, member: Member) => {
  if (guild.id !== process.env.DISCORD_GUILD_ID) return;

  if (member.bot) return;

  const roles = member.roles.slice();

  if (hasSomeTrigger(roles)) {
    roles.push(roleToAdd);
  }

  updateMemberRoles(member, roles, RoleAction.ADDED, RoleSource.OAUTH);
}