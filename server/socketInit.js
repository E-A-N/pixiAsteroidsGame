module.exports = (soc, server) => {
    soc.init = false;
    soc.game = {};
    soc.on("ean test!!", (clientData) => {
        soc.username = clientData.username;
        console.log("Username changed to:", clientData.username);
    });

    soc.on("join_game", () => {
        if (!soc.init){
            soc.game.x = 250;
            soc.game.y = 250;
        }

        soc.join(server.currentRoom); //eanDebug define server.currentRoom
    });

    return soc;
}
