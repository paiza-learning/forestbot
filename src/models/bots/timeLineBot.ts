import { Client, Message } from 'discord.js';
import Debug from 'debug';
import TimePost from '../../models/timePost';

const debug = Debug('forest');

export class TimeLineBot {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  static buildTimePost(msg: Message) {
    debug('found timeline.');
    debug(msg);

    const timePost = new TimePost(msg);
    return {
      text: timePost.text,
      options: timePost.webhookOptions(),
    };
  }
}
