import { config } from 'dotenv';

config();

/**
 * 定数を一括管理するnamespace
 */
export namespace Constants {
  /**
   * Discordに関する定数を一括管理するnamespace
   */
  export namespace Discord {
    /**
     * Discord botのtoken
     */
    export const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || '';

    /**
     * TIMELINE投稿先のDISCORDチャンネルID
     * (webhook URLの/区切り後ろから2番目)
     */
    export const TIMELINE_ID = process.env.DISCORD_TIMELINE_ID || '';

    /**
     * TIMELINE投稿先のDISCORDチャンネルトークン
     * (webhook URLの/区切り後ろから1番目)
     */
    export const TIMELINE_TOKEN = process.env.DISCORD_TIMELINE_TOKEN || '';

    /**
     * TIMESとして認識するDISCORDチャンネルの正規表現
     * 本番環境かどうかで返却する正規表現が異なる
     */
    export const TIMES_NAME_PATTERN =
      process.env.NODE_ENV == 'production'
        ? new RegExp(/^.+?[セット|ドリル|メニュー]$/)
        : new RegExp(/^.+?[セット|ドリル|メニュー]_dev$/);
  }
}

export default Constants;
