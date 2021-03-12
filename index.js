require("dotenv").config();
const { Telegraf } = require("telegraf");
const express = require("express");
const expressApp = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});
const phrases = [
  "пытаюсь до @ilya_azin достучаться",
  "хочу халивар запустить ))",
  "Пожалуйста сориентируйте у кого нет задач ? Кто свободен ?",
  "у меня максимум 10 мин на MR",
  "тут есть еще кто живой ?",
  "о вот и терроризм ))",
  "В air-bnb есть что то ?",
  "аида в дискод",
  "протяну до 16:00, после отдам Лёши",
  "Ты начал использовать ramda",
  "Зачем Id ?",
  "я допустим не хочу этим пользоваться",
  "Это привело к формированию кода",
  "будем постепенно отказываться от git",
  "есть кто живой ?",
  `У каждой медали есть 2 стороны ))
  - позитив: меньше кода
  - негатив: повышение вероятность пересечения с сторонними библиотеками`,
  "кто ни бути сталкивался с таким ?",
  "нас опять заблокировали firewall цодд",
  "прошу как можно жоше, готов править даже то что не трогал в рамках задачи",
  "у них там какой то жесткачи, у нас сейчас все начало отваливаться когда они усилили firewall",
  "Получены указания уделить внимание декомпозиций задач, так как это делает Илия",
  "коллеги прошу по возможность вернуться к практике MR",
  `хочу поделиться болию :(
    и за ленивой загрузки React.Suspense React.lazy не возможно работать с нодами`,
  "кто не знает как это делается, пожалуйста подготовитесь",
  "посоветуйте npm пакет для конвертаций markdown => html",
  "Коллеги прошу вас писать CHANGELOG дату в формате YYYY-MM-DD",
  "да генератор я не додумался использовать )))",
  "У меня нет markdown, есть только HTML",
  `Новая информация 
  - 10.11.2020 сдача АСУНС
  - 17.11.2020 сдача кпп`,
  "ООООООWWWW",
];

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
bot.help((ctx) => ctx.reply("Даже не думай"));
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
