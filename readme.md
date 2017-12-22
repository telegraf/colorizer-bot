# colorizer-bot

Telegram bot for colorizing black & white photos.

[🤖 Demo](https://t.me/clrzrbot)

Powered by [Algorithmia :: Colorful Image Colorization](https://algorithmia.com/algorithms/deeplearning/ColorfulImageColorization/)
![](https://s3.amazonaws.com/algorithmia-assets/algo_desc_images/deeplearning_ColorfulImageColorization/colorful_image_colorization_description_image.png)

## Usage

```sh
$ npm install
$ BOT_TOKEN='...' ALGORITMIA_TOKEN='...' npm run dev
```

```sh
$ yarn
$ BOT_TOKEN='...' ALGORITMIA_TOKEN='...' yarn dev
```

## Deployment

This bot can be deployed to [now](https://zeit.co/now) by Zeit.
Assuming you've got `now` installed and set up:

```sh
$ now -e BOT_TOKEN='...' -e ALGORITMIA_TOKEN='...'  telegraf/colorizer-bot
```

Alternative, deploy right now without even leaving the browser:

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/telegraf/colorizer-bot)
