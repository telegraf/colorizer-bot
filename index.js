const { Composer, fork } = require('micro-bot')
const ratelimit = require('telegraf-ratelimit')
const algorithmia = require('algorithmia')
const client = algorithmia.client(process.env.ALGORITMIA_TOKEN)

async function colorize (image) {
  const response = await client
    .algo('deeplearning/ColorfulImageColorization/1.1.7')
    .pipe({ image })
  return new Promise((resolve, reject) =>
    client.file(response.get().output).get(
      (err, result) => err ? reject(err) : resolve(result)
    )
  )
}

const limiterConfig = {
  window: 1000 * 60 * 5,
  limit: 1,
  onLimitExceeded: Composer.reply('😭 Rate limit exceeded: 1 photo per 5 minutes')
}

const bot = new Composer()

bot.start(({ reply }) => reply('Hey there!\nSend me B&W photo'))
bot.command(['help', 'about'], ({ replyWithMarkdown }) => replyWithMarkdown('[🤖 Bot source code](https://github.com/telegraf/colorizer-bot)'))
bot.on('photo', ratelimit(limiterConfig), fork(async (ctx) => {
  const { telegram, message, reply, replyWithPhoto, replyWithChatAction } = ctx
  await reply('🌈 Colorizing...')
  const photo = message.photo[2] || message.photo[1]
  const photoLink = await telegram.getFileLink(photo.file_id)
  const coloredImage = await colorize(photoLink)
  await replyWithChatAction('upload_photo')
  await replyWithPhoto({ source: coloredImage })
}))

module.exports = bot
