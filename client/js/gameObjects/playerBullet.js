//setup keyboard controls

var playerBullet = function(spr, xMomentum, yMomentum){
    spr.anchor.x = 0.5;
    spr.anchor.y = 0.5;
    spr.spd = 2;
    spr.name = "playerBullet";


    spr.create = function(){
        ship.vx = Math.cos(spr.rotation) * xMomentum;
        ship.vy = Math.sin(spr.rotation) * yMomentum;
    }

    spr.update = function(){
        if (spr.alive) {
            //Check for any collisions
            spr.singleCollisionCheck(_gameMaster.spriteList, function(self, spr2){
                if (spr2.name === "asteroidRock"){
                    self.destroySelf();
                    spr2.explode();
                    spr.alive = false;
                }
            });
        }

        // if (spr.coolDown && !spr.canShoot){
        //     setInterval(function(){
        //         spr.destroySelf();
        //     }, 150);
        // }
        spr.screenWrap();
        spr.x += spr.vx + spr.spd;
        spr.y += spr.vy + spr.spd;
    }
}
