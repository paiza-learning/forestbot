import { TextChannel, Message, MessageAttachment } from 'discord.js';
import Constants from '../constants';
import { Handler } from '../handler';

const DiscordConstants = Constants.Discord;

export namespace Router {
  export async function MessageRouter(msg: Message) {
    // メッセージがbotによるものであれば無視
    if (msg.author.bot) {
      return;
    }

    const channel = msg.channel;
    if (!(channel instanceof TextChannel)) {
      return;
    }

    if (channel.name.match(DiscordConstants.TIMES_NAME_PATTERN)) {
      Handler.timeLineHandler(msg);
    }

    // 一旦間に合わせでの実装
    if (msg.member?.hasPermission('ADMINISTRATOR') && msg.content === '/list') {
      msg.reply('DMに情報を送ります！');

      const commander = msg.author;
      if (commander.dmChannel === null) {
        await commander.createDM();
      }
      if (commander.dmChannel === null) {
        msg.reply('DMを利用することができません');
        return;
      }
      const guildMembers = msg.guild?.members;
      if (!guildMembers) {
        msg.reply('サーバ参加者の情報を取得することができません');
        return;
      }

      let contents = 'displayname,tag,id\n';
      contents += (await guildMembers.fetch())
        .map((member) => {
          return `${member.displayName},${member.user.tag},${member.user.id}`;
        })
        .join('\n');

      const attachment = new MessageAttachment(
        Buffer.from(contents),
        `forest-userlist-${Date.now().toString()}.csv`,
      );
      await commander.dmChannel?.send(attachment);
    }
  }
}
