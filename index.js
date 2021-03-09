require("dotenv").config();
const { Telegraf } = require("telegraf");
const express = require("express");
const expressApp = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});
const allowedWords = ["Денис", "Warehouse", "Олег", "Наберу"];

const sendSticker = async (ctx) => {
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

bot.start((ctx) => ctx.reply("Я вас переиграю"));
bot.help((ctx) => ctx.reply("Даже не думай"));
bot.on("text", async (ctx) => {
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

expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});

expressApp.listen(process.env.PORT || 5000, () => {
  console.log("Example app listening on port!");
});
