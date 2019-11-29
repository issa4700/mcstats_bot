module.exports = function(ip,port) {
    const server = require("statcraft-lib");
    const status = server.all(ip,port);

    this.online = server.online(ip,port);
    this.players = status.players.online;
    this.max = status.players.max;
}