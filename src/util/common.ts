import { Member } from "eris";

import { RoleAction, RoleSource } from "./types";
import { roleTriggers } from "./config";

export async function updateMemberRoles(member: Member, roles: string[], action: RoleAction, source: RoleSource): Promise<boolean> {
  if (roles.length === member.roles.length) return false;

  const reason = `Role was ${action}`;

  await member.edit({ roles }, `${reason}. [${source}]`);

  console.log(`[${new Date().toUTCString()}] ${reason} for ${member.username} (${member.id}). [${source}]`);

  return true;
}

export const hasSomeTrigger = (roles: string[]) => roles.some(role => roleTriggers.includes(role));

/**
 * Run the `callback {4}` at each `interval {1}`, with an option to `offset {2}` and `shortCall {3}`.
 */
export function setFixedInterval(interval: number, offset: number, shortCall: boolean, callback: Function) {
  setTimeout(() => {
    if (shortCall) callback();
    setInterval(() => {
      callback();
    }, interval);
  }, Date.now() % interval + offset);
}