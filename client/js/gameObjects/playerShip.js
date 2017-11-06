//setup keyboard controls

var playerShip = function(spr){
    spr.anchor.x = 0.5;
    spr.anchor.y = 0.5;
    spr.acceleration = 3.5;
    spr.spd = 5;
    spr.turnSpd = .05; //speed at which ship rotates
    spr.friction = .997; //speed at which ship will gradually slowdown
    spr.canShoot = true;
    spr.coolDown = false;
    spr.name = "playerShip";

    //This method is for debugging
    spr.debugMsg = function (msg){
        if(spr.debug){
            spr.debug.text = "DEBUG: " + msg;
        }
    }

    spr.update = function(){
        if (spr.alive) {
            playerControls(spr);
            //Check for any collisions
            spr.singleCollisionCheck(_gameMaster.spriteList, function(self, spr2){
                var msg = self.id +" is colliding with "+ spr2.id;;
                spr.debugMsg(msg);
                self.destroySelf();
                spr2.explode();
                spr.alive = false;
            });
        }

        if (spr.coolDown && !spr.canShoot){
            setInterval(function(){
                spr.canShoot = true;
                spr.coolDown = false;
            }, 250);
        }
        spr.screenWrap();
        spr.x += spr.vx;
        spr.y += spr.vy;


    }
}
