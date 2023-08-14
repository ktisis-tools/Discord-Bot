import { Client } from "eris";
import { setFixedInterval } from "../util/common";
import { guildId, joinLogChannel } from "../util/config";

export default (client: Client) => {
  console.log(`Logged in as ${client.user.username}#${client.user.discriminator}!`);

  if (!joinLogChannel) return;

  // Run interval at midnight UTC
  setFixedInterval(864e5, 0, true, () => {
    const guild = client.guilds.get(guildId);

    client.createMessage(joinLogChannel, `Total member count for <t:${Date.now()}:d>: ${guild.memberCount}`);
  });
}