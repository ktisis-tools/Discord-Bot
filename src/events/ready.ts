import { Client } from "eris";

export default (client: Client) => {
  console.log(`Logged in as ${client.user.username}#${client.user.discriminator}!`);
}