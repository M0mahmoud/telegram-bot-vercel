import { Context } from "telegraf";
import createDebug from "debug";

const debug = createDebug("bot:start_command");

const startFun = () => async (ctx: Context) => {
  const message = `Hello ${ctx.from?.first_name}!\n`;
  debug(`Triggered "start" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: "Markdown" });
};

export { startFun };
