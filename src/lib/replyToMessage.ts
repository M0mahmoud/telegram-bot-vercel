import { Context } from "telegraf";

export const replyToMessage = (
  ctx: Context,
  messageId: number,
  string: string,
  options?: { parse_mode: "MarkdownV2" }
) =>
  ctx.reply(string, {
    reply_parameters: { message_id: messageId },
    ...options,
  });
