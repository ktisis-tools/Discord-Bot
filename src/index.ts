import path from 'node:path';

import { Client } from 'eris';
import dotenv from 'dotenv';

let dotenvPath = path.join(process.cwd(), '.env');
if (path.parse(process.cwd()).name === 'dist') dotenvPath = path.join(process.cwd(), '..', '.env');
dotenv.config({ path: dotenvPath });

import guildMemberUpdateEvent from './events/guildMemberUpdate.js';
import readyEvent from './events/ready.js';

const client = new Client(process.env.DISCORD_BOT_TOKEN, {
  intents: ['guilds', 'guildMembers'],
  autoreconnect: true
});

client.on('guildMemberUpdate', guildMemberUpdateEvent.bind(null, client));
client.on('ready', readyEvent.bind(null, client));

client.connect();