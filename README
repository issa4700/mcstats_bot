# mcstats_bot
mcstats_bot is a simple discord that displays the status of your Minecraft server in Discord. 
The bot displays only the server's status (online or offline) and the number of players online.

This bot queries directly to your server, hence it is recommend for security reasons to install
 the bot on the same machine as the Minecraft server or BungeeCord server.

## Pre-requisites
* NodeJS installed
* NPM installed
* Generated a Discord bot token

## Installation
Using this bot is pretty easy and involves very little configuration.

Assuming you have met the pre-requisites, clone this repo into a folder
and run
```bash
npm install
```

Once that is complete, open the config.json file and enter the relevant details.

For example:
```json
{
	"verbose": false,
	"log": false,
	"interval": "10",
	"server": {
		"name":"Minecraft Server",
		"ip":"play.proteanmc.xyz",
		"port":"25577"
	},
	"token": "[BOT TOKEN HERE]"
}
```

Once that is complete, simply run the bot and you now have a bot that tells your server's status
in Discord!

```bash
node bot.js
```