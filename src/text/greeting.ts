import createDebug from "debug";
import { Context } from "telegraf";
import { replyToMessage } from "../lib/replyToMessage";

const debug = createDebug("bot:greeting_text");

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name}`;

  if (messageId) {
    await replyToMessage(ctx, messageId, `Hello, ${userName}!`);
  }
};

export { greeting };
