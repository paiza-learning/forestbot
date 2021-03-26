import { Client } from 'discord.js';
import { Constants } from './constants';
import { Router } from './router';
import Debug from 'debug';

const debug = Debug('forest');

const client = new Client();

client.on('ready', () => {
  debug('forest bot: ready.');
});

client.on('message', Router.MessageRouter);

client.login(Constants.Discord.BOT_TOKEN);
