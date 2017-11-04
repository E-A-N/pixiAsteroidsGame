//setup keyboard controls


var playerShip = function(ship){
    ship.update = function(){
        _keys.left.press = function(){
            ship.vx = -ship.spd;
            ship.vy = 0;
        }
    }

    ship.create = function(){

    }
}
