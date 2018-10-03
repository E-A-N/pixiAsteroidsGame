module.export = (soc, server, config) => {


    /**
        @param {string} data - an object containing player inputs
    */
    return (data) => {
        var thrusting = data.upIn;
        var turningLeft  = data.leftIn  && !data.rightIn;
        var turningRight = data.rightIn && !data.leftIn;
        var okToShoot = data.actionIn && soc.game.canShoot;

        if (okToShoot){
            soc.game.canShoot = false;
            soc.game.coolDown = true;
            soc.emit("fireBullet"); //eanDebug this is not implemented

        }

        if (thrusting){
            
        }


    }
}
