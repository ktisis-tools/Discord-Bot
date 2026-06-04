import { Client, Message, Permission, type TextableChannel } from "eris";
import { getHighestRole } from "../util/common";

type ChannelType = 'actionLog' | 'spamSnare';

export default class MessageEvent {
  channelIDs: Record<ChannelType, string>;

  _client: Client;

  reason = "Spam Snare Triggered";
  
  private ready = false;

  constructor(client: Client) {
    this._client = client;

    this.channelIDs = {
      actionLog: process.env.DISCORD_ACTION_LOG_CHANNEL,
      spamSnare: process.env.DISCORD_SPAM_SNARE_CHANNEL
    };

    this.init();
  }

  async init(): Promise<void> {
    this._client.on('messageCreate', (message) => {
      if (!this.filter(message)) return;
      this.run(message);
    });

    this.ready = true;
  }

  /**
   * Return false to stop the event from running.
   * 
   * TODO: Should probably return if the member has a higher top level role than the application.
   * - The ban attempt will fail if the member has a higher authority.
   */
  filter = (message: Message<any>): message is Message<TextableChannel> => (
    this.ready &&
    message.guildID === process.env.DISCORD_GUILD_ID &&
    message.channel.id === this.channelIDs.spamSnare &&
    message.type === 0 &&
    message.author.id !== this._client.user.id &&
    message.member.id !== message.member.guild.ownerID &&
    getHighestRole(message.member.guild.members.get(this._client.user.id)).position > getHighestRole(message.member).position &&
    !message.member.permissions.has("administrator")
  );

  async run(message: Message<TextableChannel>) {
    await message.delete(this.reason);

    const member = message.interaction?.member ?? message.member;

    let modMessage = `${this.reason} by ${member.mention}.`;

    try {
      const directToMember = await member.user.getDMChannel();
      await directToMember.createMessage("Hi, you've been banned for sending a message in a snare channel.");
    } catch (e) {
      modMessage += " *Could not send direct message.*";
    }

    await member.ban(1, this.reason);

    await this._client.createMessage(this.channelIDs.actionLog, modMessage);
  }
}