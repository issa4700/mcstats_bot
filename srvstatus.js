module.exports = function(ip,port) {
    const server = require("statcraft-lib");
    const status = server.all(ip,port);

    this.online = server.online(ip,port);
    function players() {
    	var player_list = server.list(ip,port);
    	if (player_list.error) {
    		return 0;
    	} else {
    		return player_list;
    	}
    }
    this.players = players();
    this.max = server.max_players(ip,port);
}