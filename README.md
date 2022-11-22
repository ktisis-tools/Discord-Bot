# Discord-Bot

A simple Discord bot written to handle the merging of roles, using the Eris library for Ktisis.

## Setup

> `npx degit Ktisis/Discord-Bot`

```sh
yarn
# copy .env.example to .env and fill in the values
yarn build
yarn start
```

## Configuration

*All values are required.*

| Variable | Description |
| --- | --- |
| `DISCORD_BOT_TOKEN` | The bot token. |
| `DISCORD_GUILD_ID` | The guild ID. |
| `DISCORD_TRIGGER_ROLES` | The roles that trigger the bot, separated by a comma. |
| `DISCORD_ROLE_TO_ADD` | The role to add to the user, if they have any trigger role. |