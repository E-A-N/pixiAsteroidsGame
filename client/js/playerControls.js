
//Be sure to only define keys once!!
//If keys keep getting defined it will cause memory leak!!
var k = {};
k.upInput = keyboard(38);
k.downInput = keyboard(40);
k.leftInput = keyboard(37);
k.rightInput = keyboard(39);


/**  This utility function setups the player controls for the space ship
*    @param {object} ship - reference to game ship
*    @returns TODO: find a testable return value to work with here
*/
var playerControls = function(ship){
    // var upInput = keyboard(38);
    // var downInput = keyboard(40);
    // var leftInput = keyboard(37);
    // var rightInput = keyboard(39);

    k.upInput.press = function(){
        //pressing up
        ship.vy = -ship.spd;
    }
    k.upInput.release = function(){
        if (!k.downInput.isDown) {
            ship.vy = 0;
        }
    }
    k.downInput.press = function(){
        ship.vy = ship.spd;
    }
    k.downInput.release = function(){
        if (!k.upInput.isDown) {
            ship.vy = 0;
        }
    }
    k.leftInput.press = function(){
        ship.vx = -ship.spd;
    }
    k.leftInput.release = function(){
        if (!k.rightInput.isDown) {
            ship.vx = 0;
        }
    }
    k.rightInput.press = function(){
        ship.vx = ship.spd;
    }
    k.rightInput.release = function(){
        if (!k.leftInput.isDown) {
            ship.vx = 0;
        }
    }

}
