import { Context } from "telegraf";
import createDebug from "debug";
import { User, UserDB } from "../db";

const debug = createDebug("bot:generatecode_command");

export const generateCode = () => async (ctx: Context) => {
  debug('Triggered "generatecode" text command');

  const userId = ctx.message?.from.id;
  const userName = ctx.message?.from.username || ctx.message?.from.first_name;

  const randomCode = Math.random().toString(36).substring(2, 12);

  if (userId) {
    try {
      await UserDB();
      let user = await User.findOne({ id: userId });

      if (!user) {
        user = new User({ id: ctx.message?.from.id, code: randomCode });
        await user.save();
        await ctx.reply(
          `Hello, ${userName}\nYour registration code is: ${randomCode}\nLogin within our app`
        );
      } else {
        const oldCode = user.code;
        await ctx.reply(
          `Hello, ${userName}!\nYour registration code is: ${oldCode}\nLogin within our app`
        );
      }
    } catch (error) {
      debug("Error generating code:", error);
      await ctx.reply("An error occurred while generating the code.");
    }
  }
};
