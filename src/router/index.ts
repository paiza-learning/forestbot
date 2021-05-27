import { TextChannel, Message, MessageAttachment } from 'discord.js';
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
    if (channel.name.endsWith('_dev')) {
      if (msg.content === '/list') {
        msg.reply('了解！');
        const commander = msg.author;
        if (commander.dmChannel === null) {
          await commander.createDM();
        }
        await commander.dmChannel?.send('ちょっとまってて');
        console.log(msg.guild?.members.cache);
        const guildMembers = msg.guild?.members;
        if (guildMembers !== undefined) {
          const list = await guildMembers.fetch();
          let contents = 'displayname,tag,id\n';
          list.forEach((member) => {
            contents += `${member.nickname || member.user.username},${
              member.user.tag
            },${member.user.id}\n`;
          });
          const attachment = new MessageAttachment(
            Buffer.from(contents),
            `forest-userlist-${Date.now().toString()}.csv`,
          );
          await commander.dmChannel?.send(attachment);
          await commander.dmChannel?.send('終了！');
        }
      }
    }
  }
}
