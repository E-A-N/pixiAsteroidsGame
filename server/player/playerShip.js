/**
*    This object respresents the main playable game character
*    @param {object} spr - reference to sprite to be dynamically extended into playerShip
*/
const playerShip = function(config){
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.acceleration = .05;
    this.spd = 5;
    this.turnSpd = .05; //speed at which ship rotates
    this.friction = .997; //speed at which ship will gradually slowdown
    this.canShoot = true;
    this.coolingDown = false;
    this.coolDownPeriod = 10;
    this.coolDownTime = 0;
    this.name = "playerShip";
    this.respawnTime = 200;
    //Set up variables for after image effect
    this.aImageIsCoolingDown = false;
    this.aImageCoolDownPeriod = 1;
    this.aImageCoolDownTime = 1;
    this.aImageThreshold = false;

    return this;
}



/**
*    This method prevents the ship from breaking a given speed limit
*    @param {number} maxVX - speed cap for x-axis
*    @param {number} maxVY - speed cap for y-axis
*/
playerShip.prototype.speedCap = function(maxVX, maxVY){
    if (this.vx > maxVX)  this.vx = maxVX;
    if (this.vx < -maxVX) this.vx = -maxVX;
    if (this.vy > maxVY)  this.vy = maxVY;
    if (this.vy < -maxVY) this.vy = -maxVY;

    //check to see if going fast enough to leave after images
    var blazingX = Math.abs(this.vx) > 7;
    var blazingY = Math.abs(this.vy) > 7;
    if (blazingX || blazingY) {
        //this.debugMsg("Threshold Reached!!");
        this.aImageThreshold = true;
    }
}


/**
*    This method enables a player ship to fire a bullet object
*    @returnss {object} a new created bullet object
*/
playerShip.prototype.fireBullet = function(){
    var img = _resources[_astroidSpritesSheet].textures["fireball.png"];
    var bullet = new _sprite(img);
    bullet = _objPolymorph(bullet);  //universal game object attributes
    _gameMaster.initGameSprite(bullet);    //register new sprite into game
    playerBullet(bullet); //bullet specific fields
    bullet.x = spr.x;
    bullet.y = spr.y;
    bullet.rotation = spr.rotation;
    //bullet.parent = spr;
    bullet.create();
    app.stage.addChild(bullet);

    return bullet;
}

    /**
    *    The method handles the delay for bullet shooting
    *    TODO: reimpliment this using the ticker for timing
    *    @returns {number} value representing how long down will last
    */
    spr.bulletCoolDownCheck = function() {
        if (spr.coolDown){
            if (spr.coolDownTime > 0){
                spr.coolDownTime--;
            }
            else {
                spr.canShoot = true;
                spr.coolDown = false;
                spr.coolDownTime = spr.coolDownPeriod;
            }
        }
        return spr.coolDownTime;
    }

    /**
    *    This method checks for collisions and resets the game if the ship gets destroyed
    */
    spr.checkMyDeath = function (){
        if (spr.alive) {
            playerControls(spr);
            //Check for any collisions
            spr.singleCollisionCheck(_gameMaster.spriteList, function(self, rockSpr){
                if (rockSpr.name === "asteroidRock"){
                    self.destroySelf();
                    rockSpr.explode();
                    _referee.playerDead = true;
                    spr.alive = false;
                    spr.vx = 0;
                    spr.vy = 0;
                }
            });
        }
        // else if (--spr.respawnTime < 0){
        //     window.location.reload();
        // }
    }
    /** DEBUGGING ITEMS **/
    spr.debugMsg = function (msg){
        if(spr.debug){
            spr.debug.text = "DEBUG: " + msg;
        }
    }

    /**
    *    This method checks if ship is fast enough for after images
    */
    spr.superFastEffect = function (){
        var fastAndCool = !spr.aImageIsCoolingDown && spr.aImageThreshold;
        if (spr.aImageIsCoolingDown){
            if (spr.aImageCoolDownTime > 0){
                spr.aImageCoolDownTime--;
            }
            else {
                spr.aImageIsCoolingDown = false;
            }
        }
        else if (fastAndCool) {
            spr.afterImage();
            spr.aImageCoolDownTime = spr.aImageCoolDownPeriod;
            spr.aImageIsCoolingDown = true;
            spr.aImageThreshold = false;
        }
    }

    /**
    *    @param {number} delta - A time based value that sustains relative space/time accuracy
    */
    spr.update = function(delta){
        spr.checkMyDeath();
        spr.bulletCoolDownCheck();
        spr.superFastEffect();
        //var msg = "vx: " + spr.vx +" vy:"+ spr.vy;;
        spr.debugMsg();

        spr.screenWrap();
        spr.speedCap(10,10);
        spr.x += spr.vx * delta;
        spr.y += spr.vy * delta;
    }
}
