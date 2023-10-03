# Discord-Bot

A simple Discord bot written for Ktisis to handle the merging of roles, using the Eris library.

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
| `DISCORD_EXTRA_ROLES` | Additional roles that are removed when the `DISCORD_ROLE_TO_ADD` is removed. |
| `DISCORD_ROLE_TO_ADD` | The role to add to the user, if they have any trigger role. |
| `DISCORD_JOIN_LOG_CHANNEL` | The channel ID to print the member count to. |

### Storing and using the bot token

> **Warning**
> 
> The token should be stored as a environment variable and not committed to the repository.   
> Posting it publicly is a security risk, and Discord [will reset it (docs.github.com)](https://docs.github.com/en/code-security/secret-scanning/secret-scanning-patterns#supported-secrets-for-partner-patterns:~:text=Discord-,Discord%20Bot%20Token) if committed to a public repository.

The authorized bot user must have...
- the **server member intent**, which can be enabled [on the application dashboard](https://discord.com/developers/applications).
- the `MANAGE_ROLES` permission for the `DISCORD_GUILD_ID` it is configured to run on
- a role higher than `DISCORD_ROLE_TO_ADD`
