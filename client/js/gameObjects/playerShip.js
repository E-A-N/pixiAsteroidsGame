//setup keyboard controls

var playerShip = function(spr){
    spr.anchor.x = 0.5;
    spr.anchor.y = 0.5;
    spr.acceleration = .05;
    spr.spd = 5;
    spr.turnSpd = .05; //speed at which ship rotates
    spr.friction = .997; //speed at which ship will gradually slowdown
    spr.canShoot = true;
    spr.coolingDown = false;
    spr.coolDownPeriod = 25;
    spr.coolDownTime = 25;
    spr.name = "playerShip";

    //This method is for debugging
    // spr.debugMsg = function (msg){
    //     if(spr.debug){
    //         spr.debug.text = "DEBUG: " + msg;
    //     }
    // }
    spr.speedCap = function(){
        if (spr.vx > 10){
            spr.vx = 10;
        }
        if (spr.vy > 10){
            spr.vy = 10;
        }
    }
    spr.fireBullet = function(){
        var img = _resources[_astroidSpritesSheet].textures["fireball.png"];
        var bullet = new _sprite(img);
        bullet = _objPolymorph(bullet);  //universal game object attributes
        _gameMaster.initGameSprite(bullet);    //register new sprite into game
        playerBullet(bullet); //bullet specific fields
        bullet.x = spr.x;
        bullet.y = spr.y;
        bullet.rotation = spr.rotation;
        bullet.create();
        app.stage.addChild(bullet);

        return bullet;
    }
    spr.update = function(){
        if (spr.alive) {
            playerControls(spr);
            //Check for any collisions
            spr.singleCollisionCheck(_gameMaster.spriteList, function(self, spr2){
                if (spr2.name === "asteroidRock"){
                    self.destroySelf();
                    spr2.explode();
                    spr.alive = false;
                    spr.vx = 0;
                    spr.vy = 0;
                }
            });
        }

        // var msg = "coolDown: " + spr.coolDown +" canShoot:"+ spr.canShoot;;
        // spr.debugMsg(msg);

        if (spr.coolDown){
            if (spr.coolDownTime > 0){
                spr.coolDownTime--
            }
            else {
                spr.canShoot = true;
                spr.coolDown = false;
                spr.coolDownTime = spr.coolDownPeriod;
            }
        }
        spr.screenWrap();
        spr.speedCap();
        spr.x += spr.vx;
        spr.y += spr.vy;
    }
}
