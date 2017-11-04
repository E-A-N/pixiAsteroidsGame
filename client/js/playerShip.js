//setup keyboard controls


var playerShip = function(ship){
    ship.update = function(){
        playerControls(ship);
        ship.x += ship.vx;
        ship.y += ship.vy;
        console.log("update is happneing!!");
    }

}
