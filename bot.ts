import { TelegrafContext } from "telegraf/typings/context";

require("dotenv").config();
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});
const allowedWords = ["Денис", "Warehouse", "Олег", "Наберу"];

const sendSticker = async (ctx: TelegrafContext) => {
  const stickerSet = await ctx.getStickerSet("indexUpdate");
  const stickers = stickerSet.stickers.map((sticker) => sticker.file_id);
  const stickerId = Math.round(Math.random() * stickers.length);
  const sticker = stickers[stickerId];
  if (!sticker) return;
  ctx.replyWithSticker(sticker);
};

const isShouldUpdated = () => {
  return Math.random() < 0.3;
};

bot.start((ctx: TelegrafContext) => ctx.reply("Я вас переиграю"));
bot.help((ctx: TelegrafContext) => ctx.reply("Даже не думай"));
bot.on("text", async (ctx: TelegrafContext) => {
  if (
    allowedWords.some((word) =>
      ctx.update.message.text.toLowerCase().match(word.toLowerCase())
    ) ||
    isShouldUpdated()
  ) {
    return sendSticker(ctx);
  }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
