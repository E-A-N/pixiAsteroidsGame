
//Be sure to only define keys once, otherwise memory leak will occur!
var k = {};
k.upInput = keyboard(38);
k.downInput = keyboard(40);
k.leftInput = keyboard(37);
k.rightInput = keyboard(39);
k.fInput = keyboard(70);
k.fInput2 = keyboard(32);
k.rightUIState = false;
k.leftUIState = false;
k.thrustUIState = false;
k.actionUIState = false;


document.addEventListener('DOMContentLoaded', function() {
    k.leftUIButton   = document.getElementById('leftBtn');
    k.rightUIButton  = document.getElementById('rightBtn');
    k.actionUIButton = document.getElementById('actionBtn');
    k.thrustUIButton = document.getElementById('thrustBtn');
    //left button setup
    k.leftUIButton.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        k.leftUIState = true;
        k.rightUIState = false;
    });
    k.leftUIButton.addEventListener('pointerup', (event) => {
        event.preventDefault();
        k.leftUIState = false;
        
    });
    k.leftUIButton.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
    k.leftUIButton.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent default context menu behavior
    });

    //right button setup
    k.rightUIButton.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        k.rightUIState = true;
        k.leftUIState = false;
    });
    k.rightUIButton.addEventListener('pointerup', (event) => {
        event.preventDefault();
        k.rightUIState = false;
    });
    k.rightUIButton.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
    k.rightUIButton.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent default context menu behavior
    });

    //thrust button setup
    k.thrustUIButton.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        k.thrustUIState = true;
    });
    k.thrustUIButton.addEventListener('pointerup', (event) => {
        event.preventDefault();
        k.thrustUIState = false;
    });
    k.thrustUIButton.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
    k.thrustUIButton.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent default context menu behavior
    });


    //action button setup
    k.actionUIButton.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        k.actionUIState = true;
    });
    k.actionUIButton.addEventListener('pointerup', (event) => {
        event.preventDefault();
        k.actionUIState = false;
    });
    k.actionUIButton.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
    k.actionUIButton.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent default context menu behavior
    });
});

/**  This utility function setups the player controls for the space ship
*    @param {object} ship - reference to game ship
*    @returns TODO: find a testable return value to work with here
*/
var playerControls = function(ship){

    var thrusting = k.upInput.isDown || k.thrustUIState;
    var turningLeft =  k.leftInput.isDown || k.leftUIState
        && !k.rightInput.isDown;
    var turningRight =  k.rightInput.isDown || k.rightUIState
        && !k.leftInput.isDown;
    var okToShoot = (k.fInput.isDown || k.fInput2.isDown || k.actionUIState)
        && ship.canShoot;

    if (okToShoot){
        ship.fireBullet()
        ship.canShoot = false;
        ship.coolDown = true;
    }
    if(thrusting){
        if (ship.texture.textureCacheIds[0] === "ship1.png"){
            ship.texture = ship.textureThrust
        }
        ship.vx += Math.cos(ship.rotation) * ship.acceleration;
        ship.vy += Math.sin(ship.rotation) * ship.acceleration;
    }
    else {
        ship.vx *= ship.friction;
        ship.vy *= ship.friction;
        if (ship.texture.textureCacheIds[0] === "ship2.png"){
            ship.texture = ship.textureIdle
        }
    }
    if (turningRight) {
        ship.rotation += ship.turnSpd;
    }
    if (turningLeft) {
        ship.rotation -= ship.turnSpd;
    }

}
