import { Context } from "telegraf";
import createDebug from "debug";
import { User, UserDB, RecentSearch } from "../db";
import { ForceReply } from "telegraf/typings/core/types/typegram";
import { bot } from "..";
import { MAX_MESSAGE_LENGTH, splitMessage } from "../lib/messages";

const debug = createDebug("bot:userdetails_command");
const ADMIN_05 = process.env.ADMIN_05 as string;
const ADMIN_USF = process.env.ADMIN_USF as string;

export const userDetails = () => async (ctx: Context) => {
  debug('Triggered "userdetails" text command');

  const userId = ctx.message?.from.id;

  if (userId !== Number(ADMIN_05) && userId !== Number(ADMIN_USF)) {
    await ctx.reply("You are not authorized to use this command");
    return;
  }

  try {
    await UserDB();
    let user = await User.findOne({ id: userId });

    if (!user) {
      await ctx.reply("You are not registered in the system");
      return;
    }

    await ctx.reply("Please,Send (Id or Code) of User", {
      reply_markup: {
        force_reply: true,
      } as ForceReply,
    });

    bot.on("text", async (ctx) => {
      const userX = ctx.message?.text;

      const user =
        (await User.findOne({ id: userX })) ||
        (await User.findOne({ code: userX }));

      if (!user) {
        await ctx.reply("User not found...");
        return;
      }

      const recentSearch =
        (await RecentSearch.findOne({ id: userX })) ||
        (await RecentSearch.findOne({ code: userX }));
      let urls = recentSearch
        ? recentSearch.key.join("\n")
        : "No recent searches";

      const userDetailsMessage = `User Details:
Id: \`${user.id}\`
Code: \`${user.code}\`
Points: \`${user.points}\`
Recent Search:\n${urls}`;

      if (userDetailsMessage.length <= MAX_MESSAGE_LENGTH) {
        await ctx.reply(userDetailsMessage, { parse_mode: "Markdown" });
      } else {
        const messageParts = splitMessage(userDetailsMessage);
        for (const part of messageParts) {
          await ctx.reply(part, { parse_mode: "Markdown" });
        }
      }
    });
  } catch (error) {
    debug("Error generating code:", error);
    await ctx.reply("An error occurred while generating the code.");
  }
};
