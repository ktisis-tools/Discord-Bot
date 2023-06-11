import { Client, Guild, Member } from "eris";
import { roleToAdd, roleTriggers } from "../util/config";

export default async (client: Client, guild: Guild, member: Member) => {
  if (guild.id !== process.env.DISCORD_GUILD_ID) return;

  if (member.bot) return;

  const roles = member.roles.slice();
  const roleIndex = roles.indexOf(roleToAdd);

  if (roles.some(r => roleTriggers.includes(r)) && roleIndex < 0) {
    roles.push(roleToAdd);
  }

  if (roles.length !== member.roles.length) {
    await member.edit({ roles }, `Role was added. (OAuth)`);

    console.log(`[${new Date().toUTCString()}] Role ${roleToAdd} was added for ${member.username}.`);
  }
}