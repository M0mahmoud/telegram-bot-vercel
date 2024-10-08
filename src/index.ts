import { Telegraf } from "telegraf";

import {
  editUserPoints,
  generateCode,
  startFun,
  userDetails,
} from "./commands";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { development, production } from "./core";

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const ENVIRONMENT = process.env.NODE_ENV || "";

export const bot = new Telegraf(BOT_TOKEN);

bot.command("start", startFun());
bot.command("generatecode", generateCode());
bot.command("edituserpoints", editUserPoints());
bot.command("userdetails", userDetails());
//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== "production" && development(bot);
