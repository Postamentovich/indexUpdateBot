require("dotenv").config();
const { Telegraf } = require("telegraf");
const express = require("express");
const expressApp = express();
const phrases = require("./phrases");

const bot = new Telegraf(process.env.BOT_TOKEN);

const version = 6;

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});

function getRandomElementFromArray(items) {
  const randomIndex = Math.round(Math.random() * items.length);
  return items[randomIndex];
}

const allowedWords = ["Денис", "Warehouse", "Олег", "Наберу"];

const sendSticker = async (ctx) => {
  const stickerSet = await ctx.getStickerSet("indexUpdate");
  const stickers = stickerSet.stickers.map((sticker) => sticker.file_id);
  const sticker = getRandomElementFromArray(stickers);
  if (!sticker) return;
  ctx.replyWithSticker(sticker);
};

const sendPhrase = async (ctx) => {
  const phrase = getRandomElementFromArray(phrases);
  if (!phrase) return;
  ctx.reply(phrase);
};

const isShouldUpdated = () => {
  return Math.random() < 0.3;
};

bot.start((ctx) => ctx.reply("Я вас переиграю"));
bot.help((ctx) => ctx.reply(`Version: ${version}`));
bot.on("text", async (ctx) => {
  if (
    allowedWords.some((word) =>
      ctx.update.message.text.toLowerCase().match(word.toLowerCase())
    ) ||
    isShouldUpdated()
  ) {
    if (Math.random() < 0.6) {
      sendSticker(ctx);
    } else {
      sendPhrase(ctx);
    }
  }
});

bot.launch();

expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});

expressApp.listen(process.env.PORT || 5000, () => {
  console.log("Example app listening on port!");
});
