
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
        ship.vx = Math.cos(ship.rotation) * ship.acceleration;
        ship.vy = Math.sin(ship.rotation) * ship.acceleration;
    }
    k.upInput.release = function(){
        ship.vx *= ship.friction;
        ship.vy *= ship.friction;
    }
    // k.downInput.press = function(){
    //     ship.vy = ship.spd;
    // }
    // k.downInput.release = function(){
    //     if (!k.upInput.isDown) {
    //         ship.vy = 0;
    //     }
    // }
    k.leftInput.press = function(){
        if (!k.rightInput.isDown) {
            ship.rotation += ship.turnSpd;
        }
    }
    // k.leftInput.release = function(){
    //     if (!k.rightInput.isDown) {
    //         ship.vx = 0;
    //     }
    // }
    k.rightInput.press = function(){
        if (!k.leftInput.isDown) {
            ship.rotation -= ship.turnSpd;
        }
    }
    // k.rightInput.release = function(){
    //     if (!k.leftInput.isDown) {
    //         ship.vx = 0;
    //     }
    // }

}
