//setup keyboard controls


var asteroidRock = function(spr){
    spr.name = "asteroidRock"
    spr.anchor.x = 0.5;
    spr.anchor.y = 0.5;

    //choose random direction to spin
    spr.rotateDirection = Math.round(Math.random()) ? 1 : -1;

    spr.create = function(){
        switch (spr.sizeState){

            case "small":
                spr.scale.x = .20;
                spr.scale.y = .20;
                spr.turnSpd = Math.floor(Math.random() * 10)/ 1000;
                spr.vx = (Math.floor(Math.random() * 8)/8) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 8)/8) * spr.rotateDirection;
                break;

            case "medium":
                spr.scale.x  = 0.5;
                spr.scale.y = 0.5;
                spr.turnSpd = Math.floor(Math.random() * 50)/ 1000;
                spr.vx = (Math.floor(Math.random() * 5)/15) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 5)/15) * spr.rotateDirection;
                break;

            default:
            case "big":
            //spr.width  *= 1.2;
            //spr.height *= 1.2;
                spr.turnSpd = Math.floor(Math.random() * 100)/ 10000;
                spr.vx = (Math.floor(Math.random() * 10)/20) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 10)/20) * spr.rotateDirection;
                break;
        }
    }

    spr.explode = function(){
        switch (spr.sizeState){
            case "small":
                spr.width  /= 5;
                spr.height /= 5;
                spr.turnSpd = Math.floor(Math.random() * 10)/ 1000;
                spr.vx = (Math.floor(Math.random() * 8)/8) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 8)/8) * spr.rotateDirection;
                break;

            case "medium":
                spr.width  /= 2;
                spr.height /= 2;
                spr.turnSpd = Math.floor(Math.random() * 50)/ 1000;
                spr.vx = (Math.floor(Math.random() * 5)/15) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 5)/15) * spr.rotateDirection;
                break;

            default:
            case "big":
                var med1 = new _sprite(texture);
                var med2 = new _sprite(texture);
                med1 = _objPolymorph(med1);
                med2 = _objPolymorph(med2);
                break;
        }

        return spr.id;
    }

    /**
    *    This method creates a new asteroidRock
    *    @param {string} size - a string key that determines the size of asteroidRock
    *    @returns {obj} - an astroid gameObject
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
        app.stage.addChild(babyAst);
        babyAst.create();
        return babyAst;
    }

    spr.update = function(){
        spr.screenWrap();
        spr.x += spr.vx;
        spr.y += spr.vy;
        spr.rotation += spr.turnSpd * spr.rotateDirection;
        //console.log("update is happening!!");
        var bInput = keyboard(98);
        if (bInput.isDown){
            spr.spitAsteroid('small');
        }
    }
}
