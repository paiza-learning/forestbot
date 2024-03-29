import {
  TextChannel,
  Message,
  MessageAttachment,
  Permissions,
} from 'discord.js';
import Constants from '../constants';
import { Handler } from '../handler';

const DiscordConstants = Constants.Discord;

export namespace Router {
  export async function MessageRouter(msg: Message) {
    const channel = msg.channel;
    if (!(channel instanceof TextChannel)) {
      return;
    }

    if (channel.name.match(DiscordConstants.TIMES_NAME_PATTERN)) {
      Handler.timeLineHandler(msg);
    }

    // 一旦間に合わせでの実装
    if (
      !msg.author.bot &&
      msg.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR) &&
      msg.content === '/list'
    ) {
      const guildMembers = msg.guild?.members;
      if (!guildMembers) {
        msg.reply('サーバ参加者の情報を取得することができません');
        return;
      }

      msg.reply('DMに情報を送ります！');

      const dmChannel = await msg.author.createDM();

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
      await dmChannel.send({ files: [attachment] });
    }
  }
}
