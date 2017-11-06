//setup keyboard controls


var asteroidRock = function(spr){
    spr.name = "asteroidRock"
    spr.anchor.x = 0.5;
    spr.anchor.y = 0.5;
    spr.acceleration = 1.90;
    spr.spd = 5;
    spr.friction = .99; //speed at which spr will gradually slowdown
    //choose random direction to spin
    spr.rotateDirection = Math.round(Math.random()) ? 1 : -1;

    //default sizeState is "big".  Other states are "med", "small"
    spr.sizeState = "big" //default phase is big
    spr.randy = "frosty!";


    spr.create = function(){
        switch (spr.sizeState){
            case "med":
            case "medium":
                spr.vx = Math.floor(Math.random() * 5) * spr.rotateDirection;
                spr.vy = Math.floor(Math.random() * 5) * spr.rotateDirection;
                break;

            case "small":
                spr.vx = Math.floor(Math.random() * 10) * spr.rotateDirection;
                spr.vy = Math.floor(Math.random() * 10) * spr.rotateDirection;
                break;

            default:
            case "big":
                spr.turnSpd = Math.floor(Math.random() * 100)/ 10000;
                spr.vx = (Math.floor(Math.random() * 10)/20) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 10)/20) * spr.rotateDirection;
                break;
        }
    }

    spr.update = function(){
        spr.screenWrap();
        spr.x += spr.vx;
        spr.y += spr.vy;
        spr.rotation += spr.turnSpd * spr.rotateDirection;
        //console.log("update is happening!!");
    }
}
