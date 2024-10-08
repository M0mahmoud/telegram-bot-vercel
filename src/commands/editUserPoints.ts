import { Context } from "telegraf";
import createDebug from "debug";
import { User, UserDB } from "../db";
import { ForceReply } from "telegraf/typings/core/types/typegram";
import { bot } from "..";

const debug = createDebug("bot:edituserpoints_command");
const ADMIN_05 = process.env.ADMIN_05 as string;
const ADMIN_USF = process.env.ADMIN_USF as string;

export const editUserPoints = () => async (ctx: Context) => {
  debug('Triggered "edituserpoints" text command');

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

    await ctx.reply(
      "Please,Send (id or code)-Number of points\nExample: 1234567890-100",
      {
        reply_markup: {
          force_reply: true,
        } as ForceReply,
      }
    );

    bot.on("text", async (ctx) => {
      const [userX, points] = ctx.message?.text.split("-");

      const user =
        (await User.findOne({ id: userX })) ||
        (await User.findOne({ code: userX }));

      if (!user) {
        await ctx.reply("User not found...");
        return;
      }

      user.points = Number(points);
      await user.save();
      await ctx.reply(`User points updated successfully!`);
    });
  } catch (error) {
    debug("Error generating code:", error);
    await ctx.reply("An error occurred while generating the code.");
  }
};
