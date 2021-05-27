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

if (Constants.IS_PRODUCTION) {
  client.on('guildMemberAdd', async (member) => {
    const dmChannel = await member.user.createDM();
    dmChannel.send(`こんにちは！
「paizaの森」からのお知らせです.
あなたの Discord ID は \`${member.user.id}\` です.
「paizaの森 > INFORMATION > #メールアドレスの登録」に従って, メールアドレスと上記の ID を報告してください.
ご協力ありがとうございます！`);
  });
}

client.login(Constants.Discord.BOT_TOKEN);
