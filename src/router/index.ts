import { TextChannel, Message } from 'discord.js';
import Constants from '../constants';
import { Handler } from '../handler';

const DiscordConstants = Constants.Discord;

export namespace Router {
  export function MessageRouter(msg: Message) {
    const channel = msg.channel;
    if (!(channel instanceof TextChannel)) {
      return;
    }

    if (channel.name.match(DiscordConstants.TIMES_NAME_PATTERN)) {
      Handler.timeLineHandler(msg);
    }
  }
}
