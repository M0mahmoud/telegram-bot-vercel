import { Telegraf } from "telegraf";

import { generateCode, startFun } from "./commands";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { development, production } from "./core";

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const ENVIRONMENT = process.env.NODE_ENV || "";

const bot = new Telegraf(BOT_TOKEN);

bot.command("start", startFun());
bot.command("generatecode", generateCode());

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== "production" && development(bot);
