const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require('./config.json');
const server = require('./srvstatus.js');

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);

    // check server status every x seconds
    bot.setInterval(function () {
        if (verbose) {
            var srv_name = config.server.name || config.server.ip;
            console.log(`${ts()} Checking status of ${srv_name}`);
        }

        // check server status
        const status = new server(config.server.ip, config.server.port);
        if (status.online) {
            if (verbose) { console.log(`${ts()} ${JSON.stringify(status)}`); }
            bot.user.setStatus('online');
            
            var players = status.players;
            if (players > 0) {
                bot.user.setPresence({
                game: {
                    name: "with " + status.players + " of " + status.max + " players!",
                    type: "PLAYING",
                    url: "https://" + config.ip + "/"
                }
                });
            } else {
                bot.user.setPresence({
                game: {
                    name: "with no one :-(",
                    type: "PLAYING",
                    url: "https://" + config.ip + "/"
                }
                });
            }

        } else {
            if (verbose) { console.log(`${ts(1)} ${JSON.stringify(status)}`); }
            bot.user.setStatus('dnd');
        }
    }, check_interval());

});

bot.on('message', msg => {
    if (msg.content.startsWith('.status')) {
        if (verbose||config.log) {
            console.log(`${ts()} ${msg.member} requested for status of server.`);
        }

        const status = new server(config.server.ip, config.server.port);
        if (status.online) {            
            msg.channel.send(`There are ${status.players} players online!`);
        } else if (status.online==false) {
            msg.channel.send(`Oh no! :scream: \nLooks like something's wrong with the server.\nHang on tight! We're fixing it as soon as we can.`);
            if (verbose) { console.log(`${ts(1)} ${JSON.stringify(status)}`); }
        } else {
            msg.channel.send(`Oops! It looks like I am configured incorrectly. Please let the admin know about this!`)
            if (verbose) { console.log(`${ts(2)} ${JSON.stringify(status)}`); }
        }
    }

    // bot info
    else if (msg.content.startsWith('.about')) {
        msg.channel.send(`**mcsrvstats-reloaded** - NodeJS based Minecraft server status checker.\nRelease 1901.1
            \nCreated by @issa4700\nhttps://issa4700.xyz/`);
    }
});

bot.login(config.token);

/* CONSOLE INPUTS */
var readline = require('readline');
var t = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

t.on('line', function(line){
    line = line.trim();
    if (line&&verbose) { console.log(`${ts()} I/O event STDIN "${line}"`); }
    if (line=="end") { destroy_bot(); }
});

/*  AUXILIARY FUNCTIONS  */
var verbose = config.verbose !== undefined ? config.verbose:false;
function ts(err_type) {
    var d = new Date();
    var err = err_type !== undefined ? err_type:0;
    switch (err) {
        case 0:
            err = "INFO";
            break;
        case 1:
            err = "WARN";
            break;
        case 2:
            err = "ERR ";
            break;
    }
    d = d.toTimeString().split(' ')[0];
    return `[${d}] ${err}:`;
}

function check_interval() {
    var interval = config.interval !== undefined ? config.interval:"30";
    return  interval*1000;
};

async function destroy_bot() {
    console.log(`${ts(1)} Bot is shutting down!`);    
    await sleep(2000);
    try { 
        bot.destroy();
        console.log(`${ts()} Bot successfully logged out!`)
    } catch(e) {
        console.log(`${ts(2)} ${e}`);
    } finally {
        await sleep(1000);
        process.exit();
    }
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}