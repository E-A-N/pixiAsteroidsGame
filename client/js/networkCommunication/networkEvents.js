//Declare Client, establish connection


var NetEvents = function(){};
//var Client = new NetEvents;

/**
* @param {string} ip - ip address that will allow socket.io to interface with game client
* @param {object} game - reference to the current phaser game
*/
NetEvents.prototype.init = function(ip,game){

    this.game = game || null;
    this.playerList = {};

    this.ip = ip || "http://127.0.0.1:7777";
    this.socket = io(this.ip);

    //Messages to SEND to server
    this.movePlayer     = "movePlayer";
    this.changeGraphics = "changeGraphics";

    //Messages FROM server
    this.update             = "stateUpdate";
    this.disconnect         = "disconnect"; //eanDebug check if disconnect or disconnecting is proper built in api
    this.removePlayer       = "removePlayer";
    this.addNewPlayer       = "addNewPlayer";
    this.addPlayers         = "addPlayers";
    this.joinedGame         = "joinGameSuccess";
    this.input              = "playerInput";

    //this.clientListen(); //listen for 'on' events
}

/**
* @param {string} message - message key used to pass to server
* @param {object} data    - game mechanic related data to pass to server
*/
NetEvents.prototype.sendToServer = function(message,data){
    this.socket.emit(message,data);
}


/** Check on player statuses
*   @param {string} message - instructions delivered from server
*   @param {object}   data    - a collection of players ( or individual player) to manage
*   @return {bool}
*/
NetEvents.prototype.allocatePlayers = function(message, data){

    var dataAllocated = false;
    switch(message){

        //Add a new player to the game
        case this.addNewPlayer:
            dataAllocated = this.addNewPlayerSocket(data);
        break;

        //successfully joined game!
        case this.joinedGame:
            dataAllocated = this.joinGameSocket(data);
        break;

        //update player positions and game status
        case this.update:
            dataAllocated = this.allocateGameData(data);
        break;

        //update player graphics
        case this.changeGraphics:
            dataAllocated = this.changeGraphicsSocket(data);
        break;

        //remove player that has exited game
        case this.removePlayer:
            dataAllocated = this.destroyPlayerSocket(data)
        break;
    }
    return dataAllocated;
}

/**
*    @param {string} data - message from server
*    @return {bool}
*/
NetEvents.prototype.joinGameSocket = function(data){
    var joined = false;
    console.log("You have joined the game!! :D");
    this.game.state.start("Game");
    joined = true;

    return joined;
}

/**
*    @param {object} data - socket containing information about new player
*    @return {bool}
*/
NetEvents.prototype.addNewPlayerSocket = function(data){
    var dataAppended = false;

    //Only add player socket to list if it doesn't exist
    if (!this.playerList[data.id]){
        var x = data.x;
        var y = data.y;
        var img = "red-fly";
        this.playerList[data.id] = this.game.add.sprite(x,y,img);
        dataAppended = true;
    }
    return dataAppended;
}

/**
*    @param {object} data - socket containing information about player
*    @return {bool}
*/
NetEvents.prototype.destroyPlayerSocket = function(data){
    var dataRemoved = false;
    if(this.playerList[data.id]){
        delete this.playerList[data.id];
        dataRemoved = true;
    }
    return dataRemoved;
}

/**
*    @param {object} data - A collection of all player data from server
*    @return {bool}
*/
NetEvents.prototype.changeSpriteSocket = function(data){
    var graphicsChanged = false;
    var len = data.length;
    for(var i = 0; i < len; i++) {
        var player = this.playerList[data[i].id];
        if (player) {
            player.tint = data[i].tint;
            graphicsChanged = true;
        }
    }
    return graphicsChanged;
}

/**
*    @param {object} data - A package of network data delivered from the server
*    @return {bool}
*/
NetEvents.prototype.allocateGameData = function(data){
    var allocated = false;
    var len = data.length;
    for (var i = 0; i < len; i++){
        var current = this.playerList[data[i].id];
        if(current){
            current.x = data[i].x;
            current.y = data[i].y;
            current.tint = data[i].tint;
            allocated = true;
        }
    }
    return allocated;
}
