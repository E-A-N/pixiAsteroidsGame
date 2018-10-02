module.export = (soc, server, config) => {

    return (data) => {
        var thrusting = data.upIn;
        var turningLeft  = data.leftIn  && !data.rightIn;
        var turningRight = data.rightIn && !data.leftIn;
        var okToShoot = data.actionIn && soc.game.canShoot;

        if (okToShoot){
            soc.emit("fireBullet"); //eanDebug this is not implemented
        }
    }
}
