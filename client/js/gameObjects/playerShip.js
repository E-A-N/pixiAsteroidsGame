//setup keyboard controls

var playerShip = function(spr){
    spr.anchor.x = 0.5;
    spr.anchor.y = 0.5;
    spr.acceleration = .05;
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
        bullet = _objPolymorph;
        _gameMaster.initGameSprite(bullet);
        playerBullet(bullet, spr.vx, spr.vy );
        bullet.x = spr.x;
        bullet.y = spr.y;
        bullet.create();
        app.stage.addChild(bullet);
        var msg = "The bullet id is: "+ bullet.id;;
        spr.debugMsg(msg);

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
                }
            });
        }

        var msg = "coolDown: " + self.coolDown +" canShoot:"+ self.canShoot;;
        spr.debugMsg(msg);

        if (spr.coolDown && !spr.canShoot){
            setInterval(function(){
                spr.canShoot = true;
                spr.coolDown = false;
            }, 250);
        }
        spr.screenWrap();
        spr.speedCap();
        spr.x += spr.vx;
        spr.y += spr.vy;
    }
}
