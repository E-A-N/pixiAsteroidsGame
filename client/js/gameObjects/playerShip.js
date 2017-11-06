//setup keyboard controls


var playerShip = function(ship){
    ship.anchor.x = 0.5;
    ship.anchor.y = 0.5;
    ship.acceleration = 3.5;
    ship.spd = 5;
    ship.turnSpd = .05; //speed at which ship rotates
    ship.friction = .997; //speed at which ship will gradually slowdown
    ship.name = "playerShip"

    ship.update = function(){
        playerControls(ship);
        ship.screenWrap();
        ship.x += ship.vx;
        ship.y += ship.vy;
        //console.log("update is happening!!");
    }
}
