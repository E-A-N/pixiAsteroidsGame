//setup keyboard controls


var playerShip = function(ship){
    ship.anchor.x = 0.5;
    ship.anchor.y = 0.5;
    ship.acceleration = 1.90;
    ship.spd = 5;
    ship.turnSpd = .25; //speed at which ship rotates
    ship.friction = .99; //speed at which ship will gradually slowdown

    ship.update = function(){
        playerControls(ship);
        ship.x += ship.vx;
        ship.y += ship.vy;
        //console.log("update is happening!!");
    }

}
