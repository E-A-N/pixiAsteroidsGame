/**
*    @param {object} spr - reference to sprite to be dynamically expanded
*/
var asteroidRock = function(spr){
    console.log("spr info:", spr)

    /** @memberof asteroidRock */
    spr.name = "asteroidRock";
    spr.alpha = 0; //gameMaster countdown will reveal alpha

    //choose random direction to spin
    spr.rotateDirection = Math.round(Math.random()) ? 1 : -1;

    /**
    *   @returnss {bool} returns true to indicate tests this method is successfully overwritten
    */
    spr.create = function(){
        switch (spr.sizeState){

            case "small":
                spr.scale.x = .20;
                spr.scale.y = .20;
                spr.turnSpd = Math.floor(Math.random() * 30)/ 100;
                spr.vx = (Math.floor(Math.random() * 30)/40) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 30)/40) * spr.rotateDirection;
                spr.scoreValue = 40;
                spr.boomOst = _ost.smallExplosion;
                spr.boundsOffsetX = 0.3;
                spr.boundsOffsetY = 0.3;
                spr.boundsOffsetW = 0.4;
                spr.boundsOffsetH = 0.4;
                break;

            case "medium":
                spr.scale.x  = 0.5;
                spr.scale.y = 0.5;
                spr.turnSpd = Math.floor(Math.random() * 50)/ 1000;
                spr.vx = (Math.floor(Math.random() * 5)/15) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 5)/15) * spr.rotateDirection;
                spr.scoreValue = 20;
                spr.boomOst = _ost.medExplosion;
                spr.boundsOffsetX = 0.3;
                spr.boundsOffsetY = 0.3;
                spr.boundsOffsetW = 0.4;
                spr.boundsOffsetH = 0.4;
                break;

            default:
            case "big":
                spr.turnSpd = Math.floor(Math.random() * 100)/ 10000;
                spr.vx = (Math.floor(Math.random() * 10)/20) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 10)/20) * spr.rotateDirection;
                spr.scoreValue = 10;
                spr.boomOst = _ost.bigExplosion;
                spr.boundsOffsetX = 0.25;
                spr.boundsOffsetY = 0.20;
                spr.boundsOffsetW = 0.6;
                spr.boundsOffsetH = 0.6;
                break;
        }

        spr.anchor.x = 0.5;
        spr.anchor.y = 0.5;
        return true;
    }

    /**
    *    This method destroys a rock and splits it smaller chunks depending on size
    *   @returnss {number} returns id of gameObject
    */
    spr.explode = function(){
        switch (spr.sizeState){
            case "small":
                navigator.vibrate(50);
                break;

            case "medium":
                navigator.vibrate(100);
                spr.spitAsteroid('small');
                spr.spitAsteroid('small');
                spr.spitAsteroid('small');
                spr.spitAsteroid('small');
                spr.spitAsteroid('small');
                spr.spitAsteroid('small');
                break;

            default:
                navigator.vibrate(200);
                spr.spitAsteroid('medium');
                spr.spitAsteroid('medium');
                spr.spitAsteroid('medium');
                break;
        }
        spr.boomOst.play();
        spr.destroySelf(function(){
            //increase game score
            scoreBoard.score += spr.scoreValue;
        });
        return spr.id;
    }

    /**
    *    This method creates a new asteroidRock
    *    @param {string} size - a string key that determines the size of asteroidRock
    *    @returnss {obj} - an astroid gameObject
    */
    spr.spitAsteroid = function(size) {
        var babyAst = new _sprite(spr.texture); //turn texture into sprite
        babyAst = _objPolymorph(babyAst);       //give sprite global game object attributes
        _gameMaster.initGameSprite(babyAst);    //register new sprite into game
        asteroidRock(babyAst);  //give sprite asteroidRock specific fields

        var randomDir = Math.round(Math.random()) ? 1 : -1;
        //assign size and location
        babyAst.sizeState = size;
        babyAst.x = spr.x + (Math.random() * 25) * randomDir;
        babyAst.y = spr.y + (Math.random() * 25) * randomDir;
        babyAst.alpha = 1;
        babyAst.intangible = false;
        babyAst.create();
        app.stage.addChild(babyAst);
        return babyAst;
    }

    /**
    *    @param {number} delta - A time based value that sustains relative space/time accuracy
    */
    spr.update = function(delta){
        if (DEBUG_MODE){
            spr.drawBounds(); 
        }
        spr.screenWrap();
        spr.x += spr.vx * delta;
        spr.y += spr.vy * delta;
        spr.rotation += spr.turnSpd * spr.rotateDirection;
    }
}
