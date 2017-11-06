/**
*    @param {object} spr - A reference to an extended pixi game sprite
*/
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
    spr.respawnTime = 200;

    //Set up variables for after image effect
    spr.aImageIsCoolingDown = false;
    spr.aImageCoolDownPeriod = 5;
    spr.aImageCoolDownTime = 5;

    //This method is for debugging
    // spr.debugMsg = function (msg){
    //     if(spr.debug){
    //         spr.debug.text = "DEBUG: " + msg;
    //     }
    // }

    /**
    *    This method prevents the ship from breaking a given speed limit
    *    @param {number} maxVX - speed cap for x-axis
    *    @param {number} maxVY - speed cap for y-axis
    */
    spr.speedCap = function(maxVX, maxVY){
        if (spr.vx > maxVX){
            spr.vx = maxVX;
        }
        if (spr.vy > maxVY){
            spr.vy = maxVY;
        }
    }

    spr.afterImage = function(){
        var img = spr.texture;
        img = new _sprite(img);
        img = _objPolymorph(img);
        img.x = spr.x;
        img.y = spr.y;
        img.rotation = spr.rotation;
        img.update = function(){

        }

    }
    /**
    *    This method enables a player ship to fire a bullet object
    *    @returns {object} a new created bullet object
    */
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

    /**
    *    @param {number} delta - A time based value that sustains relative space/time accuracy
    */
    spr.update = function(delta){
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
        else if (--spr.respawnTime < 0){
            window.location.reload();
        }

        /** DEBUGGING ITEMS **/
        // var msg = "coolDown: " + spr.coolDown +" canShoot:"+ spr.canShoot;;
        // spr.debugMsg(msg);

        //TODO: reimpliment this using the ticker for timing
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
        spr.x += spr.vx * delta;
        spr.y += spr.vy * delta;
    }
}
