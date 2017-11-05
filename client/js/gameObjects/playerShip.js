//setup keyboard controls


var playerShip = function(ship){
    ship.acceleration = 0.40;
    ship.spd = 5;
    

    ship.update = function(){
        playerControls(ship);
        ship.x += ship.vx;
        ship.y += ship.vy;
        //console.log("update is happening!!");
    }

}
