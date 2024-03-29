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
 * Run the {@link callback} at each {@link interval}, with options to {@link offset} and {@link shortCall}.
 */
export function setFixedInterval(interval: number, offset: number, shortCall: boolean, callback: Function) {
  return new FixedInterval(interval, offset, shortCall, callback);
}

class FixedInterval {
  isFirstCall: boolean = true;
  ref: NodeJS.Timer;

  constructor(
    private interval: number,
    private offset: number,
    private shortCall: boolean,
    private callback: Function
  ) {
    this.run();
  }

  get timeUntilNextCall(): number {
    return this.interval - Date.now() % this.interval + this.offset;
  }

  private run() {
    this.ref = setTimeout(() => {
      if (!this.isFirstCall || this.shortCall) {
        this.callback();
      }
      this.isFirstCall = false;
      this.run();
    }, this.timeUntilNextCall);
  }

  destroy() {
    if (this.ref) clearTimeout(this.ref);
  }
}