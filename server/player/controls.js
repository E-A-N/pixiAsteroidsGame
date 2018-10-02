module.export = (soc, server, config) => {

    return (data) => {
        soc.game.leftInput    = data.leftIn;
        soc.game.rightInput   = data.rightIn;
        soc.game.actionInput  = data.actionIn;
    }
}
