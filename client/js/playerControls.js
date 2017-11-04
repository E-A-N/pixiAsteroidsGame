
/**  This utility function setups the player controls for the space ship
*    @param {object} ship - reference to game ship
*    @returns TODO: find a testable return value to work with here
*/
var playerControls = function(ship){
    var upInput = keyboard(38);
    var downInput = keyboard(40);
    var leftInput = keyboard(37);
    var rightInput = keyboard(39);

    upInput.press = function(){
        //pressing up
        ship.vy = -ship.spd;
    }
    upInput.release = function(){
        if (!downInput.isDown) {
            ship.vy = 0;
        }
    }
    downInput.press = function(){
        ship.vy = ship.spd;
    }
    downInput.release = function(){
        if (!upInput.isDown) {
            ship.vy = 0;
        }
    }
    leftInput.press = function(){
        ship.vx = -ship.spd;
    }
    leftInput.release = function(){
        if (!rightInput.isDown) {
            ship.vx = 0;
        }
    }
    rightInput.press = function(){
        ship.vx = ship.spd;
    }
    rightInput.release = function(){
        if (!leftInput.isDown) {
            ship.vx = 0;
        }
    }

}
